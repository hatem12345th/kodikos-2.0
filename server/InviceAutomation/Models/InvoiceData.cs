namespace InvoiceAutomation.Models ;
public class InvoiceData
{
    public string VendorName { get; set; } = null!;
    public string? VendorAddress { get; set; }
    public string? CustomerName { get; set; }
    public string? CustomerAddress { get; set; }
    public string? InvoiceNumber { get; set; }
    public string? InvoiceDate { get; set; }
    public string? DueDate { get; set; }
    public decimal TotalAmount { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal Subtotal { get; set; }
    public string Currency { get; set; } = "DZ";
    public string PaymentTerms { get; set; } = string.Empty;
    public string PaymentInstructions { get; set; } = string.Empty;
    public List<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
}
