using Google.Apis.Auth.OAuth2;
using Google.Apis.Auth.OAuth2.Flows;
using Google.Apis.Gmail.v1.Data;
using Google.Apis.Services;
using InvoiceAutomation.Interfaces;
using InvoiceAutomation.Models;
using GmailApiService = Google.Apis.Gmail.v1.GmailService;

namespace InvoiceAutomation.Services
{
    public class GmailService : IGmailService
    {
        private readonly IConfiguration _configuration;

        public GmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private GmailApiService GetGmailApiService(string accessToken)
        {
            var credential = GoogleCredential.FromAccessToken(accessToken);
            return new GmailApiService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "InvoiceAutomation"
            });
        }

        public async Task<List<EmailMessage>> GetUnreadEmailsWithAttachmentsAsync(string accessToken)
        {
            var service = GetGmailApiService(accessToken);
            var result = new List<EmailMessage>();

            var request = service.Users.Messages.List("me");
            request.Q = "is:unread has:attachment";
            request.MaxResults = 10;

            var response = await request.ExecuteAsync();

            if (response.Messages == null || !response.Messages.Any())
                return result;

            foreach (var msgRef in response.Messages)
            {
                var msg = await service.Users.Messages.Get("me", msgRef.Id).ExecuteAsync();

                var from = msg.Payload.Headers.FirstOrDefault(h => h.Name == "From")?.Value;
                var subject = msg.Payload.Headers.FirstOrDefault(h => h.Name == "Subject")?.Value;
                var dateStr = msg.Payload.Headers.FirstOrDefault(h => h.Name == "Date")?.Value;

                result.Add(new EmailMessage
                {
                    Id = msg.Id, // string to string - no conversion needed
                    From = from,
                    Subject = subject,
                    ReceivedDate = DateTime.TryParse(dateStr, out var date) ? date : DateTime.UtcNow,
                    HasAttachments = true
                });
            }

            return result;
        }

        public async Task<List<EmailAttachment>> GetEmailAttachmentsAsync(string messageId, string accessToken)
        {
            var service = GetGmailApiService(accessToken);
            var attachments = new List<EmailAttachment>();

            var message = await service.Users.Messages.Get("me", messageId).ExecuteAsync();

            // Check if the message has parts
            if (message.Payload.Parts != null)
            {
                await ProcessPartsAsync(message.Payload.Parts, service, messageId, attachments);
            }

            return attachments;
        }

        private async Task ProcessPartsAsync(IList<Google.Apis.Gmail.v1.Data.MessagePart> parts, GmailApiService service, string messageId, List<EmailAttachment> attachments)
        {
            if (parts == null) return;

            foreach (var part in parts)
            {
                if (!string.IsNullOrEmpty(part.Filename) && part.Body?.AttachmentId != null)
                {
                    var mimeType = part.MimeType ?? "";
                    
                    // Only process images and PDFs
                    if (mimeType.StartsWith("image/") || mimeType == "application/pdf")
                    {
                        var attachment = await service.Users.Messages.Attachments
                            .Get("me", messageId, part.Body.AttachmentId).ExecuteAsync();

                        // Proper base64 URL decoding
                        var base64Data = attachment.Data;
                        if (base64Data != null)
                        {
                            base64Data = base64Data.Replace('-', '+').Replace('_', '/');
                            // Add padding if necessary
                            switch (base64Data.Length % 4)
                            {
                                case 2: base64Data += "=="; break;
                                case 3: base64Data += "="; break;
                            }

                            var data = Convert.FromBase64String(base64Data);

                            attachments.Add(new EmailAttachment
                            {
                                Id = part.Body.AttachmentId,
                                FileName = part.Filename,
                                MimeType = mimeType,
                                Size = part.Body.Size ?? 0,
                                Data = data
                            });
                        }
                    }
                }

                // Recursively process nested parts
                if (part.Parts != null && part.Parts.Any())
                {
                    await ProcessPartsAsync(part.Parts, service, messageId, attachments);
                }
            }
        }

        public async Task MarkEmailAsReadAsync(string messageId, string accessToken)
        {
            var service = GetGmailApiService(accessToken);
            
            var modifyRequest = new ModifyMessageRequest
            {
                RemoveLabelIds = new List<string> { "UNREAD" }
            };

            await service.Users.Messages.Modify(modifyRequest, "me", messageId).ExecuteAsync();
        }

        public async Task<string> RefreshAccessTokenAsync(string refreshToken)
        {
            var clientId = _configuration["Google:ClientId"];
            var clientSecret = _configuration["Google:ClientSecret"];

            if (string.IsNullOrEmpty(clientId) || string.IsNullOrEmpty(clientSecret))
            {
                throw new InvalidOperationException("Google ClientId or ClientSecret is not configured");
            }

            var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            {
                ClientSecrets = new ClientSecrets
                {
                    ClientId = clientId,
                    ClientSecret = clientSecret
                }
            });

            var tokenResponse = await flow.RefreshTokenAsync("user", refreshToken, CancellationToken.None);
            
            if (tokenResponse == null)
            {
                throw new InvalidOperationException($"Failed to refresh token");
            }

            return tokenResponse.AccessToken;
        }
    }
}