using Microsoft.AspNetCore.Mvc;
using IELTS_API.DTOs;
using IELTS_API.Services;
using IELTS_API.Models;

namespace IELTS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _service;

        public CategoriesController(CategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetCategories()
        {
            var categories = await _service.GetAllCategoriesAsync();

            //var dtos = categories.Select(c => new CategoryDTO
            //{
            //    Id = c.Id,
            //    Title = c.Title,
            //    DurationTime = c.DurationTime,
            //    QuestionCount = c.QuestionCount,
            //    PublishedYear = c.PublishedYear
            //}).ToList();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
        {
            var category = await _service.GetCategoryByIdAsync(id);
            if (category == null)
                return NotFound();

            //var dto = new CategoryDTO
            //{
            //    Id = category.Id,
            //    Title = category.Title,
            //    DurationTime = category.DurationTime,
            //    QuestionCount = category.QuestionCount,
            //    PublishedYear = category.PublishedYear
            //};

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDTO>> PostCategory(CategoryCreateDTO dto)
        {
            var category = await _service.CreateCategoryAsync(dto);

            //var resultDto = new CategoryDTO
            //{
            //    Id = category.Id,
            //    Title = category.Title,
            //    DurationTime = category.DurationTime,
            //    QuestionCount = category.QuestionCount,
            //    PublishedYear = category.PublishedYear
            //};

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, CategoryUpdateDTO dto)
        {
            var updated = await _service.UpdateCategoryAsync(id, dto);
            if (updated == null)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var success = await _service.DeleteCategoryAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}