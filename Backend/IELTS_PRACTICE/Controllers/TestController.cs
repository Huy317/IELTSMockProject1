using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Models;
using IELTS_PRACTICE.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly TestService _testService;
        public TestController(TestService testService) { 
            _testService = testService;
        }

        [HttpGet]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<IEnumerable<TestDTO>>> GetAllTest() { 
            return await _testService.GetAllTest();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TestDTO>> GetTestById(int id) { 
            var test = await _testService.GetTestById(id);
            if (test == null) { 
                return NotFound();
            }
            return Ok(test);
        }

        [HttpPost]
        public async Task<ActionResult<TestDTO>> CreateTest(CreateTestDTO rq)
        {
            await _testService.CreateTest(rq);
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult<TestDTO>> UpdateTest(int id ,UpdateTestDTO rq)
        {
            var currentTest = await _testService.GetTestById(id);
            if (currentTest == null) {
                return NotFound();
            }
            await _testService.UpdateTest(id, rq);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest(int id)
        {
            var test = await _testService.GetTestById(id);
            if (test == null) {
                return NotFound();
            }
            await _testService.DeleteTest(id);
            return NoContent();
        }
    }
}
