using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.Models;
using IELTS_PRACTICE.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly MediaService _mediaService;
        public MediaController(MediaService mediaService)
        {
            _mediaService = mediaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Media>>> GetAllMedia()
        {
            return await _mediaService.GetAllMediaAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Media>> GetMediaById(int id)
        {
            var media = await _mediaService.GetMediaByIdAsync(id);
            if (media == null)
            {
                return NotFound();
            }
            return Ok(media);
        }

        [HttpPost]
        public async Task<ActionResult<Media>> AddMedia(Media media)
        {
            var createdMedia = await _mediaService.AddMediaAsync(media);
            return CreatedAtAction("GetMediaById", new { id = createdMedia.Id }, createdMedia);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMedia(int id, Media media)
        {
            if (id != media.Id)
            {
                return BadRequest();
            }
            var updatedMedia = await _mediaService.UpdateMediaAsync(media);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedia(int id)
        {
            var result = await _mediaService.DeleteMediaAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }


    }
}
