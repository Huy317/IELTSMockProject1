using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.Models;
using IELTS_PRACTICE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Mime;
using System.Threading.Tasks;

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {   
        private const long MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes
        private readonly string _uploadFolder;
        private readonly MediaService _mediaService;
        public FileUploadController(IWebHostEnvironment env, MediaService mediaService)
        {
            _mediaService = mediaService;
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
        public async Task<IActionResult> UploadFile(IFormFile file)
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
            var fileName = Path.GetFileName(file.FileName);
            var uniqueName = $"{Guid.NewGuid()}_{fileName}";
            var filePath = Path.Combine(_uploadFolder, uniqueName);
            
            // Save to disk
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                file.CopyTo(stream);
            }

            // return success response
            var fileUrl = $"{Request.Scheme}://{Request.Host}/UploadedFiles/{uniqueName}";

            var med = new Media
            {
                OriginalFileName = fileName,
                FileName = uniqueName,
                FilePath = $"/UploadedFiles/{uniqueName}",
                FileUrl = fileUrl,
                UploadedAt = DateTime.UtcNow
            };

            // store to media table
            await _mediaService.AddMediaAsync(med);
            
            return Ok(new {
                url = fileUrl,
                fileName = file.FileName,
                fileSize = file.Length,
                contentType = file.ContentType
               });
        }

    }
}
