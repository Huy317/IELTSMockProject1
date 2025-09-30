using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Services;
using Microsoft.AspNetCore.Mvc;

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly QuestionService _questionService;
        public QuestionController(QuestionService questionService)
        {
            _questionService = questionService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuestionDTO>>> GetAllQuestion()
        {
            return await _questionService.GetAllQuestion();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionDTO>> GetQuestionById(int id)
        {
            var question = await _questionService.GetQuestionById(id);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);
        }

        [HttpGet("bytestid")]
        public async Task<ActionResult<QuestionDTO>> GetQuestionByTestId(int id)
        {
            var question = await _questionService.getQuestionByTestId(id);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);
        }
        [HttpGet("allquestionsbyid")]
        public async Task<ActionResult<QuestionFullDetailDTO>> GetAllQuestionByTestId(int id)
        {
            var questions = await _questionService.getAllQuestionsAndParagraphByTestId(id);
            if (questions == null)
            {
                return NotFound();
            }
            return Ok(questions);
        }

        [HttpPost]
        public async Task<ActionResult<QuestionFullDetailDTO>> CreateQuestion(CreateQuestionDTO rq)
        {
            var question = await _questionService.CreateQuestion(rq);

            return Ok(question);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<QuestionDTO>> UpdateQuestion(int id, UpdateQuestionDTO rq)
        {
            var current = await _questionService.GetQuestionOrParagraphById(id);
            if (current == null) { 
                return NotFound();
            }
            await _questionService.UpdateQuestion(id, rq);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var question = await _questionService.GetQuestionById(id);
            if (question == null)
            {
                return NotFound();
            }
            await _questionService.DeleteQuestion(id);
            return NoContent();
        }
    }
}
