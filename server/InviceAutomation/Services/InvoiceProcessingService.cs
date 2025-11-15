using InvoiceAutomation.Interfaces;
using InvoiceAutomation.Models;

namespace InvoiceAutomation.Services
{
    public class InvoiceProcessingService(
        IMistralOcrService _ocrService,
        IInvoiceAnalysisService _analysisService,
        IExcelService _excelService,
        ILogger<InvoiceProcessingService> _logger) : IInvoiceProcessingService
    {
          public async Task ProcessAttachmentAndLogToExcelAsync(byte[] fileData, string fileName)
        {
            var excelLogFileName = "Invoice_Log.xlsx";
            var excelLogFilePath = Path.Combine(Directory.GetCurrentDirectory(), excelLogFileName);

            try
            {
                var extractedText = await _ocrService.ExtractTextFromImageAsync(fileData, fileName);
                var newInvoiceData = await _analysisService.AnalyzeInvoiceTextAsync(extractedText);

                byte[] updatedExcelData;
                if (File.Exists(excelLogFilePath))
                {
                    var existingExcelData = await File.ReadAllBytesAsync(excelLogFilePath);
                    updatedExcelData = await _excelService.AddInvoiceToExcelAsync(existingExcelData, newInvoiceData);
                }
                else
                {
                    var invoices = new List<InvoiceData> { newInvoiceData };
                    updatedExcelData = await _excelService.GenerateInvoiceExcelAsync(invoices);
                }
                
                await File.WriteAllBytesAsync(excelLogFilePath, updatedExcelData);

                _logger.LogInformation($"Successfully processed and logged invoice from attachment: {fileName}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while processing attachment {fileName}.");
                throw;
            }
        }
    }
}