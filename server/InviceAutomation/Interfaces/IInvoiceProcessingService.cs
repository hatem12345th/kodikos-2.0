namespace InvoiceAutomation.Interfaces
{
    public interface IInvoiceProcessingService
    {
        Task ProcessAttachmentAndLogToExcelAsync(byte[] fileData, string fileName);
    }
}