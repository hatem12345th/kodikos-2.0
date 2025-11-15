using InvoiceAutomation.Models;

namespace InvoiceAutomation.Interfaces ; 
public interface IGmailService
{
    Task<List<EmailMessage>> GetUnreadEmailsWithAttachmentsAsync(string accessToken);
    Task<List<EmailAttachment>> GetEmailAttachmentsAsync(string messageId, string accessToken);
    Task MarkEmailAsReadAsync(string messageId, string accessToken);
    Task<string> RefreshAccessTokenAsync(string refreshToken);
}
