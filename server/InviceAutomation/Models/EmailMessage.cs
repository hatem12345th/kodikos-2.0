namespace InvoiceAutomation.Models ; 
public class EmailMessage
{
    public string Id { get; set; } 
    public string From { get; set; } = string.Empty ;
    public string Subject { get; set; } = string.Empty;
    public DateTime ReceivedDate { get; set; }
    public bool HasAttachments { get; set; }
}