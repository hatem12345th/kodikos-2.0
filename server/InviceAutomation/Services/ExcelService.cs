using InvoiceAutomation.Models;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace InvoiceAutomation.Services
{
    public class ExcelService : IExcelService
    {
        public ExcelService()
        {
        }

        public async Task<byte[]> GenerateInvoiceExcelAsync(List<InvoiceData> invoices)
        {
            using var package = new ExcelPackage();
            
            var summarySheet = package.Workbook.Worksheets.Add("Summary");
            CreateSummarySheet(summarySheet, invoices);

            var detailSheet = package.Workbook.Worksheets.Add("Detailed Invoices");
            CreateDetailedSheet(detailSheet, invoices);

            return await package.GetAsByteArrayAsync();
        }

        private void CreateSummarySheet(ExcelWorksheet sheet, List<InvoiceData> invoices)
        {
            sheet.Cells["A1"].Value = "Invoice Number";
            sheet.Cells["B1"].Value = "Vendor";
            sheet.Cells["C1"].Value = "Date";
            sheet.Cells["D1"].Value = "Due Date";
            sheet.Cells["E1"].Value = "Subtotal";
            sheet.Cells["F1"].Value = "Tax";
            sheet.Cells["G1"].Value = "Total";
            sheet.Cells["H1"].Value = "Currency";

            using (var range = sheet.Cells["A1:H1"])
            {
                range.Style.Font.Bold = true;
                range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                range.Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightBlue);
            }

            // Data
            int row = 2;
            foreach (var invoice in invoices)
            {
                sheet.Cells[row, 1].Value = invoice.InvoiceNumber;
                sheet.Cells[row, 2].Value = invoice.VendorName;
                sheet.Cells[row, 3].Value = invoice.InvoiceDate;
                sheet.Cells[row, 4].Value = invoice.DueDate;
                sheet.Cells[row, 5].Value = invoice.Subtotal;
                sheet.Cells[row, 6].Value = invoice.TaxAmount;
                sheet.Cells[row, 7].Value = invoice.TotalAmount;
                sheet.Cells[row, 8].Value = invoice.Currency;
                row++;
            }

            // Auto-fit columns
            sheet.Cells[sheet.Dimension.Address].AutoFitColumns();
        }

        private void CreateDetailedSheet(ExcelWorksheet sheet, List<InvoiceData> invoices)
        {
            int row = 1;

            foreach (var invoice in invoices)
            {
                
                sheet.Cells[row, 1].Value = "Invoice Number:";
                sheet.Cells[row, 2].Value = invoice.InvoiceNumber;
                sheet.Cells[row, 1].Style.Font.Bold = true;
                row++;

                sheet.Cells[row, 1].Value = "Vendor:";
                sheet.Cells[row, 2].Value = invoice.VendorName;
                row++;

                sheet.Cells[row, 1].Value = "Customer:";
                sheet.Cells[row, 2].Value = invoice.CustomerName;
                row++;

                sheet.Cells[row, 1].Value = "Date:";
                sheet.Cells[row, 2].Value = invoice.InvoiceDate;
                row++;

                row++; 
                
                sheet.Cells[row, 1].Value = "Description";
                sheet.Cells[row, 2].Value = "Quantity";
                sheet.Cells[row, 3].Value = "Unit Price";
                sheet.Cells[row, 4].Value = "Total";
                
                using (var range = sheet.Cells[row, 1, row, 4])
                {
                    range.Style.Font.Bold = true;
                    range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    range.Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightGray);
                }
                row++;

                foreach (var item in invoice.Items ?? new List<InvoiceItem>())
                {
                    sheet.Cells[row, 1].Value = item.Description;
                    sheet.Cells[row, 2].Value = item.Quantity;
                    sheet.Cells[row, 3].Value = item.UnitPrice;
                    sheet.Cells[row, 4].Value = item.Total;
                    row++;
                }

                row++; 

                sheet.Cells[row, 3].Value = "Subtotal:";
                sheet.Cells[row, 4].Value = invoice.Subtotal;
                row++;

                sheet.Cells[row, 3].Value = "Tax:";
                sheet.Cells[row, 4].Value = invoice.TaxAmount;
                row++;

                sheet.Cells[row, 3].Value = "Total:";
                sheet.Cells[row, 4].Value = invoice.TotalAmount;
                sheet.Cells[row, 3].Style.Font.Bold = true;
                sheet.Cells[row, 4].Style.Font.Bold = true;
                row++;

                row += 2; 
            }

            sheet.Cells[sheet.Dimension.Address].AutoFitColumns();
        }

        public async Task<byte[]> AddInvoiceToExcelAsync(byte[] existingExcelData, InvoiceData newInvoice)
        {
            using var stream = new MemoryStream(existingExcelData);
            using var package = new ExcelPackage(stream);

            var summarySheet = package.Workbook.Worksheets.FirstOrDefault(ws => ws.Name == "Summary");
            if (summarySheet != null)
            {
                var row = summarySheet.Dimension?.End.Row + 1 ?? 2;

                summarySheet.Cells[row, 1].Value = newInvoice.InvoiceNumber;
                summarySheet.Cells[row, 2].Value = newInvoice.VendorName;
                summarySheet.Cells[row, 3].Value = newInvoice.InvoiceDate;
                summarySheet.Cells[row, 4].Value = newInvoice.DueDate;
                summarySheet.Cells[row, 5].Value = newInvoice.Subtotal;
                summarySheet.Cells[row, 6].Value = newInvoice.TaxAmount;
                summarySheet.Cells[row, 7].Value = newInvoice.TotalAmount;
                summarySheet.Cells[row, 8].Value = newInvoice.Currency;
            }


            return await package.GetAsByteArrayAsync();
        }
    }
}
