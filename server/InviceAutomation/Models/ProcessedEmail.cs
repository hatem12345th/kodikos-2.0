namespace InvoiceAutomation.Models; 
    public class ProcessedEmail
    {
        public int Id { get; set; }
        public string GmailId { get; set; } = string.Empty;
        public string From { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public DateTime ReceivedDate { get; set; }
        public string AttachmentName { get; set; } = string.Empty;
        public string ExtractedText { get; set; } = string.Empty;
        public string InvoiceDataJson { get; set; } = string.Empty;
        public bool IsProcessed { get; set; }
        public DateTime ProcessedAt { get; set; }
        public string ErrorMessage { get; set; } = string.Empty;
        public Guid UserId { get; set; } 
        public User User { get; set; } = null!;
    }
