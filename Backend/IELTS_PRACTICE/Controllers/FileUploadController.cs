using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace IELTS_PRACTICE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FileUploadController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        // Catbox.moe API configuration
        private const string CATBOX_API_URL = "https://catbox.moe/user/api.php";
        private const long MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes

        // Catbox user hash - provide your user hash here if you want authenticated uploads
        private const string CATBOX_USER_HASH = ""; // Leave empty for anonymous uploads or add your hash

        public FileUploadController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpPost("upload")]
        [RequestSizeLimit(MAX_FILE_SIZE)]
        [RequestFormLimits(MultipartBodyLengthLimit = MAX_FILE_SIZE)]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            try
            {
                // Validate file
                if (file == null || file.Length == 0)
                {
                    return BadRequest(new { error = "No file provided" });
                }

                if (file.Length > MAX_FILE_SIZE)
                {
                    return BadRequest(new { error = $"File size exceeds 200MB limit. Current size: {file.Length / 1024.0 / 1024.0:F2}MB" });
                }

                Console.WriteLine($"Uploading file: {file.FileName}, Size: {file.Length / 1024.0 / 1024.0:F2}MB, Type: {file.ContentType}");

                // Create HTTP client with proper configuration
                using var httpClient = _httpClientFactory.CreateClient();
                httpClient.Timeout = TimeSpan.FromMinutes(10); // Extended timeout for large files

                // Add User-Agent header (some services require this)
                httpClient.DefaultRequestHeaders.Add("User-Agent", "IELTS-Practice-App/1.0");

                // Prepare form data - DO NOT set Content-Type header manually for multipart
                using var formData = new MultipartFormDataContent();

                // Add request type
                formData.Add(new StringContent("fileupload"), "reqtype");

                // Add user hash if available (for authenticated uploads)
                if (!string.IsNullOrEmpty(CATBOX_USER_HASH))
                {
                    formData.Add(new StringContent(CATBOX_USER_HASH), "userhash");
                    Console.WriteLine("Using authenticated upload with user hash");
                }
                else
                {
                    Console.WriteLine("Using anonymous upload");
                }

                // Add file data
                var fileContent = new StreamContent(file.OpenReadStream());

                // Set content type for the file
                if (!string.IsNullOrEmpty(file.ContentType))
                {
                    fileContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(file.ContentType);
                }

                // Add file to form data with proper field name
                formData.Add(fileContent, "fileToUpload", file.FileName);

                Console.WriteLine("Sending request to Catbox.moe...");

                // Make request to Catbox
                var response = await httpClient.PostAsync(CATBOX_API_URL, formData);

                Console.WriteLine($"Catbox response status: {response.StatusCode}");

                // Read the response content
                var responseContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Catbox response content: '{responseContent}'");

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Catbox API error: Status {response.StatusCode}, Content: {responseContent}");
                    return StatusCode(500, new
                    {
                        error = $"Upload service returned error: {response.StatusCode}",
                        details = responseContent
                    });
                }

                // Get the file URL from response
                var fileUrl = responseContent.Trim();

                // Validate response
                if (string.IsNullOrEmpty(fileUrl))
                {
                    Console.WriteLine("Empty response from Catbox");
                    return StatusCode(500, new { error = "Empty response from upload service" });
                }

                // Check if response is an error message
                if (fileUrl.Contains("error") || fileUrl.Contains("Error") || !fileUrl.StartsWith("https://"))
                {
                    Console.WriteLine($"Invalid response from Catbox: {fileUrl}");
                    return StatusCode(500, new { error = "Invalid response from upload service", details = fileUrl });
                }

                Console.WriteLine($"File uploaded successfully: {fileUrl}");

                return Ok(new
                {
                    url = fileUrl,
                    fileName = file.FileName,
                    fileSize = file.Length,
                    contentType = file.ContentType
                });

            }
            catch (HttpRequestException httpEx)
            {
                Console.WriteLine($"HTTP request error: {httpEx.Message}");
                Console.WriteLine($"Stack trace: {httpEx.StackTrace}");
                return StatusCode(500, new
                {
                    error = "Network error while uploading file",
                    details = httpEx.Message
                });
            }
            catch (TaskCanceledException tcEx)
            {
                Console.WriteLine($"Request timeout: {tcEx.Message}");
                return StatusCode(500, new
                {
                    error = "Upload request timed out",
                    details = "The file upload took too long to complete"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Unexpected error: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new
                {
                    error = "Internal server error during file upload",
                    details = ex.Message
                });
            }
        }

        // Test endpoint to verify controller is working
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new
            {
                message = "FileUpload controller is working!",
                timestamp = DateTime.UtcNow,
                catboxUrl = CATBOX_API_URL
            });
        }
    }
}