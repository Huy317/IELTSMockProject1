using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Models;
using Microsoft.EntityFrameworkCore;

namespace IELTS_PRACTICE.Services
{
    public class QuestionService
    {
        private readonly AppDbContext _context;
        public QuestionService(AppDbContext context) { 
            _context = context;
        }

        public async Task<List<QuestionDTO>> GetAllQuestion() {
            return _context.Questions
                .Where(x => x.ParentId != 0) //parentId == 0 is content
                .Select(x => new QuestionDTO {
                    QuestionType = x.QuestionType,
                    Content = x.Content,
                    CorrectAnswer = x.CorrectAnswer,
                    Choices = x.Choices,
                    Explanation = x.Explanation,
                }).ToList();
        }

        public async Task<QuestionDTO> GetQuestionById(int id)
        {
            return await _context.Questions
                .Where(x => x.ParentId != 0 && x.Id == id) //parentId == 0 is content
                .Select(x => new QuestionDTO
                {
                    QuestionType = x.QuestionType,
                    Content = x.Content,
                    CorrectAnswer = x.CorrectAnswer,
                    Choices = x.Choices,
                    Explanation = x.Explanation,
                })
                .FirstOrDefaultAsync();
        }

        public async Task<QuestionDTO> CreateQuestion(CreateQuestionDTO rq) {
            if (rq.ParentId == 0) {
                var content = new Question
                {
                    Content = rq.Content,
                    ParentId = rq.ParentId
                };
                _context.Questions.Add(content);
                _context.SaveChanges();
                return new QuestionDTO
                {
                    Content = rq.Content,
                };
            }

            var question = new Question
            {
                QuestionType = rq.QuestionType,
                Content = rq.Content,
                CorrectAnswer = rq.CorrectAnswer,
                Choices = rq.Choices,
                Explanation = rq.Explanation,
                ParentId = rq.ParentId,
                TypeId = rq.TypeId,
                TestId = rq.TestId,
                Link = rq.Link,
            };
            _context.Questions.Add(question);
            _context.SaveChanges();
            return new QuestionDTO
            {
                QuestionType = question.QuestionType,
                Content = question.Content,
                CorrectAnswer = question.CorrectAnswer,
                Choices= question.Choices,
                Explanation = question.Explanation,
            };
        }

        public async Task DeleteQuestion(int id) {
            var question = _context.Questions.Find(id);
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
        }
    }
}
