namespace InvoiceAutomation.Models; 
public class EmailAttachment
{
    public string Id { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string MimeType { get; set; } = string.Empty;
    public long Size { get; set; }
    public byte[] Data { get; set; } = [];
}
