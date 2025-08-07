using IELTS_API.DTOs;
using IELTS_API.Models;
using IELTS_API.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IELTS_API.Controllers
{
    [Route("api/Tests")]
    [ApiController]
    public class TestsController : ControllerBase
    {
        private readonly TestService _service;

        public TestsController(TestService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestDTO>>> GetTests()
        {
            var tests = await _service.GetAllAsync();
            return Ok(tests);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TestDTO>> GetTest(int id)
        {
            var test = await _service.GetByIdAsync(id);
            if (test == null)
            {
                return NotFound();
            }
            return Ok(test);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTest(int id, TestUpdateDTO dto)
        {
            var success = await _service.UpdateAsync(id, dto);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TestDTO>> PostTest(TestCreateDTO dto)
        {
            var createdTest = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetTest), new { id = createdTest.Id }, createdTest);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }

        private bool TestExists(int id)
        {
            return _service.Exists(id);
        }

        private static TestDTO ItemDTO(Test test) => TestService.ToDTO(test); // preserved
    }
}