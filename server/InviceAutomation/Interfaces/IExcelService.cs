using InvoiceAutomation.Models;

namespace InvoiceAutomation.Services ;
public interface IExcelService
{
    Task<byte[]> GenerateInvoiceExcelAsync(List<InvoiceData> invoices);

    Task<byte[]> AddInvoiceToExcelAsync(byte[] existingExcelData, InvoiceData newInvoice);


}
