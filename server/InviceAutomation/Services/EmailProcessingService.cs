using InvoiceAutomation.Data;
using InvoiceAutomation.Interfaces; 
using InvoiceAutomation.Models;
using Microsoft.EntityFrameworkCore;

namespace InvoiceAutomation.Services
{
    public class EmailProcessingService(
        IServiceProvider _serviceProvider,
        ILogger<EmailProcessingService> _logger) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Email Processing Service has started.");

            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    await ProcessAllUsersEmailsAsync();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "An unhandled exception occurred in the email processing service loop.");
                }

                await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
            }
        }

        private async Task ProcessAllUsersEmailsAsync()
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            var invoiceProcessingService = scope.ServiceProvider.GetRequiredService<IInvoiceProcessingService>();
            var gmailService = scope.ServiceProvider.GetRequiredService<IGmailService>();

            var users = await dbContext.Users.ToListAsync();

            foreach (var user in users)
            {
                try
                {
                    await ProcessUserEmailsAsync(user, gmailService, invoiceProcessingService, dbContext);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Failed to process emails for user {user.Email}.");
                }
            }
        }

        private async Task ProcessUserEmailsAsync(
            User user,
            IGmailService gmailService,
            IInvoiceProcessingService invoiceProcessingService,
            ApplicationDbContext dbContext)
        {
            if (user.TokenExpiry <= DateTime.UtcNow)
            {
                var newAccessToken = await gmailService.RefreshAccessTokenAsync(user.GoogleRefreshToken);
                user.GoogleAccessToken = newAccessToken;
                user.TokenExpiry = DateTime.UtcNow.AddHours(1); 
                await dbContext.SaveChangesAsync();
            }

            var emails = await gmailService.GetUnreadEmailsWithAttachmentsAsync(user.GoogleAccessToken);

            foreach (var email in emails)
            {
                try
                {
                    var attachments = await gmailService.GetEmailAttachmentsAsync(email.Id, user.GoogleAccessToken);

                    foreach (var attachment in attachments)
                    {
                        await invoiceProcessingService.ProcessAttachmentAndLogToExcelAsync(
                            attachment.Data,
                            attachment.FileName);
                    }

                    await gmailService.MarkEmailAsReadAsync(email.Id, user.GoogleAccessToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error processing email {email.Id} for user {user.Email}. The email will not be marked as read and will be retried later.");
                }
            }
        }
    }
}