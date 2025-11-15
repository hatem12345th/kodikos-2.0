using InvoiceAutomation.Models;
using InvoiceAutomation.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InvoiceAutomation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoiceController (
            IMistralOcrService _ocrService,
            IInvoiceAnalysisService _analysisService,
            IExcelService _excelService): ControllerBase
    {


        [HttpPost("process")]
        [ProducesResponseType(typeof(FileContentResult), 200)]
        public async Task<IActionResult> ProcessAndAppendToLog(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file was uploaded.");
            }

            var allowedTypes = new[] { "image/jpeg", "image/png", "image/jpg", "application/pdf" };
            if (!allowedTypes.Contains(file.ContentType))
            {
                return BadRequest("Invalid file type. Only JPEG, PNG, and PDF are allowed.");
            }

            var excelLogFileName = "Invoice_Log.xlsx";
            var excelLogFilePath = Path.Combine(Directory.GetCurrentDirectory(), excelLogFileName);

            try
            {
                byte[] fileData;
                using (var ms = new MemoryStream()) { await file.CopyToAsync(ms); fileData = ms.ToArray(); }

                var extractedText = await _ocrService.ExtractTextFromImageAsync(fileData, file.FileName);
                var newInvoiceData = await _analysisService.AnalyzeInvoiceTextAsync(extractedText);

                byte[] updatedExcelData;
                if (System.IO.File.Exists(excelLogFilePath))
                {
                    var existingExcelData = await System.IO.File.ReadAllBytesAsync(excelLogFilePath);
                    updatedExcelData = await _excelService.AddInvoiceToExcelAsync(existingExcelData, newInvoiceData);
                }
                else
                {
                    var invoices = new List<InvoiceData> { newInvoiceData };
                    updatedExcelData = await _excelService.GenerateInvoiceExcelAsync(invoices);
                }
                await System.IO.File.WriteAllBytesAsync(excelLogFilePath, updatedExcelData);
                var mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                return File(updatedExcelData, mimeType, excelLogFileName);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred during processing.", details = ex.Message });
            }
        }
    
    
                [HttpPost("manual-add-to-excel")]
        public async Task<IActionResult> AddManualInvoiceToExcel([FromBody] InvoiceData manualInvoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var excelLogFileName = "Invoice_Log.xlsx";
            var excelLogFilePath = Path.Combine(Directory.GetCurrentDirectory(), excelLogFileName);

            try
            {
                byte[] updatedExcelData;
                if (System.IO.File.Exists(excelLogFilePath))
                {
                    var existingExcelData = await System.IO.File.ReadAllBytesAsync(excelLogFilePath);
                    updatedExcelData = await _excelService.AddInvoiceToExcelAsync(existingExcelData, manualInvoice);
                }
                else
                {
                    var invoices = new List<InvoiceData> { manualInvoice };
                    updatedExcelData = await _excelService.GenerateInvoiceExcelAsync(invoices);
                }

                await System.IO.File.WriteAllBytesAsync(excelLogFilePath, updatedExcelData);

                return Ok(new { message = "Invoice has been successfully added to the Excel log." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "An error occurred while writing to the Excel log.", details = ex.Message });
            }
        }

    }


}