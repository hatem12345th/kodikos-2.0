using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace InvoiceAutomation.Services
{
    public class MistralOcrService : IMistralOcrService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public MistralOcrService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _apiKey = configuration["Mistral:ApiKey"] ?? "";
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
        }

        public async Task<string> ExtractTextFromImageAsync(byte[] imageData, string fileName)
        {
            var base64Image = Convert.ToBase64String(imageData);
            var mimeType = GetMimeType(fileName);
            var dataUri = $"data:{mimeType};base64,{base64Image}";

            var requestPayload = new JsonObject
            {
                ["model"] = "mistral-ocr-latest"
            };

            if (mimeType == "application/pdf")
            {
                requestPayload["document"] = new JsonObject
                {
                    ["type"] = "document_url",
                    ["document_url"] = dataUri
                };
            }
            else
            {
                requestPayload["document"] = new JsonObject
                {
                    ["type"] = "image_url",
                    ["image_url"] = dataUri
                };
            }

            requestPayload["include_image_base64"] = false;

            var content = new StringContent(
                requestPayload.ToJsonString(),
                Encoding.UTF8,
                "application/json"
            );

            var response = await _httpClient.PostAsync("https://api.mistral.ai/v1/ocr", content);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException(
                    $"Response status code does not indicate success: {(int)response.StatusCode} ({response.ReasonPhrase}). " +
                    $"API Response: {errorContent}"
                );
            }

            var result = await response.Content.ReadAsStringAsync();

            try
            {
                var jsonDoc = JsonDocument.Parse(result);
                var root = jsonDoc.RootElement;
                if (root.TryGetProperty("pages", out var pagesArray) && pagesArray.GetArrayLength() > 0)
                {
                    var firstPage = pagesArray[0];
                    if (firstPage.TryGetProperty("markdown", out var markdownElement))
                    {
                        return markdownElement.GetString() ?? "Found 'markdown' property, but it was null.";
                    }
                }
                
                return $"SUCCESS, BUT COULD NOT FIND 'markdown' in 'pages' array. RAW RESPONSE: {result}";
            }
            catch (JsonException ex)
            {
                return $"JSON PARSE ERROR: {ex.Message}. RAW RESPONSE: {result}";
            }
        }

        private string GetMimeType(string fileName)
        {
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            return extension switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".bmp" => "image/bmp",
                ".pdf" => "application/pdf",
                _ => "application/octet-stream"
            };
        }

        public Task<string> ExtractTextFromUrlAsync(string documentUrl)
        {
            throw new NotImplementedException();
        }
    }
}