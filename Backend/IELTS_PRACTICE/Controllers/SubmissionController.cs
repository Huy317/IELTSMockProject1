using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Services;
using Microsoft.AspNetCore.Mvc;

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionController : Controller
    {
        private readonly TestSubmissionService _testSubmissionService;
        public SubmissionController(TestSubmissionService testSubmissionService)
        {
            _testSubmissionService = testSubmissionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestSubmissionDTO>>> GetAllTestSubmission()
        {
            return await _testSubmissionService.GetAllTestSubmission();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TestSubmissionDTO>> GetTestSubmissionById(int id)
        {
            var sub = await _testSubmissionService.GetTestSubmissionById(id);
            if (sub == null)
            {
                return NotFound();
            }
            return Ok(sub);
        }

        [HttpPost]
        public async Task<ActionResult<TestSubmissionDTO>> CreateTestSubmission(CreateTestSubmissionDTO rq)
        {
            await _testSubmissionService.CreateTestSubmission(rq);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestSubmission(int id)
        {
            var test = await _testSubmissionService.GetTestSubmissionById(id);
            if (test == null)
            {
                return NotFound();
            }
            await _testSubmissionService.DeleteTestSubmission(id);
            return NoContent();
        }

        [HttpGet("getrecentlysubmit")]
        public async Task<IActionResult> GetRecentlySubmissionById(int studentId) { 
            var result = await _testSubmissionService.ViewRecentlySubmission(studentId);
            if (result == null) { 
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitTest(SubmitRequest rq) { 
            var  result = await _testSubmissionService.SubmitTest2(rq);
            return Ok(result);
        }
    }
}
