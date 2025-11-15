using System.Threading.Tasks;

namespace InvoiceAutomation.Services
{
    public interface IMistralOcrService
    {
        Task<string> ExtractTextFromImageAsync(byte[] imageData, string fileName);
        Task<string> ExtractTextFromUrlAsync(string documentUrl);
    }
}

