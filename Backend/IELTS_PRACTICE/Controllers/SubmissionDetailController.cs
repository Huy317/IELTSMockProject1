using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Services;
using Microsoft.AspNetCore.Mvc;

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubmissionDetailController : ControllerBase
    {
        private readonly TestSubmissionDetailService _testSubmissionDetailService;
        public SubmissionDetailController(TestSubmissionDetailService testSubmissionDetailService)
        {
            _testSubmissionDetailService = testSubmissionDetailService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestSubmissionDetailDTO>>> GetAllTestSubmissionDetail()
        {
            return await _testSubmissionDetailService.GetAllTestSubmissionDetail();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TestSubmissionDetailDTO>> GetTestSubmissionDetailById(int id)
        {
            var sub = await _testSubmissionDetailService.GetTestSubmissionDetailById(id);
            if (sub == null)
            {
                return NotFound();
            }
            return Ok(sub);
        }

        [HttpPost]
        public async Task<ActionResult<TestSubmissionDetailDTO>> CreateTestSubmissionDetail(CreateTestSubmissionDetailDTO rq)
        {
            await _testSubmissionDetailService.CreateTestSubmissionDetail(rq);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestSubmissionDetail(int id)
        {
            var test = await _testSubmissionDetailService.GetTestSubmissionDetailById(id);
            if (test == null)
            {
                return NotFound();
            }
            await _testSubmissionDetailService.DeleteTestSubmissionDetail(id);
            return NoContent();
        }
    }
}
