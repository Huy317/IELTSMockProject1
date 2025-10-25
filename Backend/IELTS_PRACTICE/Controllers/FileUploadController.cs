using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        private const long MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes
        private readonly string _uploadFolder;

        public FileUploadController(IWebHostEnvironment env)
        {
            // Set up upload folder
            _uploadFolder = Path.Combine(env.ContentRootPath, "UploadedFiles");
            if (!Directory.Exists(_uploadFolder))
            {
                Directory.CreateDirectory(_uploadFolder);
            }
        }

        [HttpPost("upload")]
        [RequestSizeLimit(MAX_FILE_SIZE)]
        [RequestFormLimits(MultipartBodyLengthLimit = MAX_FILE_SIZE)]
        public IActionResult UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { error = "No file provided" });
            }

            if (file.Length > MAX_FILE_SIZE)
            {
                return BadRequest(new { error = $"File size exceeds 200MB limit. Current size: {file.Length / 1024.0 / 1024.0:F2}MB" });
            }

            // Generate unique file name
            var uniqueName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var filePath = Path.Combine(_uploadFolder, uniqueName);

            // Save to disk
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            // return success response
            var fileUrl = $"{Request.Scheme}://{Request.Host}/UploadedFiles/{uniqueName}";


            return Ok(new {
                url = fileUrl,
                fileName = file.FileName,
                fileSize = file.Length,
                contentType = file.ContentType
            });
        }

    }
}
