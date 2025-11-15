using InvoiceAutomation.Models;

namespace InvoiceAutomation.Services ; 

public interface IInvoiceAnalysisService
{
    Task<InvoiceData> AnalyzeInvoiceTextAsync(string extractedText);
}
