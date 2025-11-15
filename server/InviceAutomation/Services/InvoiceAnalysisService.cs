using System.Text;
using System.Text.Json;
using InvoiceAutomation.Models;

namespace InvoiceAutomation.Services
{
    public class InvoiceAnalysisService : IInvoiceAnalysisService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public InvoiceAnalysisService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["Mistral:ApiKey"]??"";
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
        }

        public async Task<InvoiceData> AnalyzeInvoiceTextAsync(string extractedText)
        {
            var prompt = $@"Extract invoice information from the following text and respond ONLY with valid JSON (no markdown, no backticks, no preamble):
            {extractedText}

        Return JSON with this exact structure:
        {{
        ""VendorName"": ""string"",
        ""VendorAddress"": ""string"",
        ""CustomerName"": ""string"",
        ""CustomerAddress"": ""string"",
        ""InvoiceNumber"": ""string"",
        ""InvoiceDate"": ""YYYY-MM-DD"",
        ""DueDate"": ""YYYY-MM-DD"",
        ""TotalAmount"": 0.00,
        ""TaxAmount"": 0.00,
        ""Subtotal"": 0.00,
        ""Currency"": ""USD"",
        ""PaymentTerms"": ""string"",
        ""PaymentInstructions"": ""string"",
        ""Items"": [
            {{
            ""Description"": ""string"",
            ""Quantity"": 0.00,
            ""UnitPrice"": 0.00,
            ""Total"": 0.00
            }}
        ]
        }}";

            var request = new
            {
                model = "mistral-small-latest",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                },
                temperature = 0.1,
                max_tokens = 2000
            };

            var content = new StringContent(
                JsonSerializer.Serialize(request),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync("https://api.mistral.ai/v1/chat/completions", content);
            response.EnsureSuccessStatusCode();

            var result = await response.Content.ReadAsStringAsync();
            var jsonDoc = JsonDocument.Parse(result);
            
            var messageContent = jsonDoc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString();

            var cleanedJson = messageContent 
                .Replace("```json", "")
                .Replace("```", "")
                .Trim();

            var invoiceData = JsonSerializer.Deserialize<InvoiceData>(cleanedJson, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return invoiceData;
        }
    }
}

