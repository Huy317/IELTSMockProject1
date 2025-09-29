using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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
                    Id = x.Id,
                    QuestionType = x.QuestionType,
                    Content = x.Content,
                    CorrectAnswer = x.CorrectAnswer,
                    Choices = x.Choices,
                    Explanation = x.Explanation,
                    TestId = x.TestId,
                    Order = x.Order,
                }).ToList();
        }

        public async Task<QuestionDTO> GetQuestionById(int id)
        {
            return await _context.Questions
                .Where(x => x.ParentId != 0 && x.Id == id) //parentId == 0 is content
                .Select(x => new QuestionDTO
                {
                    Id = x.Id,
                    QuestionType = x.QuestionType,
                    Content = x.Content,
                    CorrectAnswer = x.CorrectAnswer,
                    Choices = x.Choices,
                    Explanation = x.Explanation,
                    TestId = x.TestId,
                    Order = x.Order,
                })
                .FirstOrDefaultAsync();
        }

        public async Task<List<QuestionFullDetailDTO>> getQuestionByTestId(int id)
        {
            return _context.Questions
                .Where(x => x.TestId == id)
                .Select(x => new QuestionFullDetailDTO
                {
                    Id = x.Id,
                    QuestionType = x.QuestionType,
                    Content = x.Content,
                    Choices = x.Choices,
                    Explanation = x.Explanation,
                    TestId = x.TestId,
                    Order = x.Order,
                    ParentId = x.ParentId,
                    Link = x.Link,

                }).ToList();
        }

        public async Task<List<QuestionFullDetailDTO>> getAllQuestionsAndParagraphByTestId(int id)
        {
            return _context.Questions
                .Where(x => x.TestId == id)
                .Select(x => new QuestionFullDetailDTO
                {
                    Id = x.Id,
                    QuestionType = x.QuestionType,
                    Content = x.Content,
                    CorrectAnswer = x.CorrectAnswer,
                    Choices = x.Choices,
                    Explanation = x.Explanation,
                    TestId = x.TestId,
                    ParentId = x.ParentId,
                    Order = x.Order,
                    Link = x.Link,
                }).ToList();
        }

        public async Task<QuestionDTO> CreateQuestion(CreateQuestionDTO rq) {
            if (rq.ParentId == 0) {
                var content = new Question
                {
                    QuestionType = "Paragraph",
                    Content = rq.Content,
                    CorrectAnswer = "",
                    Choices = "",
                    Explanation = "",
                    ParentId = rq.ParentId,
                    //TypeId = rq.TypeId,
                    TestId = rq.TestId,
                    Link = "",
                    Order = rq.Order,
                };
                _context.Questions.Add(content);
                _context.SaveChanges();
                return new QuestionDTO
                {
                    Id = content.Id,
                    Content = rq.Content,
                    TestId= rq.TestId,
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
                //TypeId = rq.TypeId,
                TestId = rq.TestId,
                Link = rq.Link,
                Order = rq.Order,
            };
            _context.Questions.Add(question);
            _context.SaveChanges();
            return new QuestionDTO
            {
                Id = question.Id,
                QuestionType = question.QuestionType,
                Content = question.Content,
                CorrectAnswer = question.CorrectAnswer,
                Choices= question.Choices,
                Explanation = question.Explanation,
                TestId = question.TestId,
                Order = question.Order,
            };
        }

        public async Task<QuestionDTO> UpdateQuestion(int id, UpdateQuestionDTO rq)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return null;
            }

            question.QuestionType = rq.QuestionType;
            question.Content = rq.Content;
            question.CorrectAnswer = rq.CorrectAnswer;
            question.Choices = rq.Choices;
            question.Explanation = rq.Explanation;
            question.Link = rq.Link;
            question.Order = rq.Order;
            question.ParentId = rq.ParentId;

            _context.Questions.Update(question);
            await _context.SaveChangesAsync();
            return new QuestionDTO
            {
                QuestionType = question.QuestionType,
                Content = question.Content,
                CorrectAnswer = question.CorrectAnswer,
                Choices = question.Choices,
                Explanation = question.Explanation,
                TestId = question.TestId,
                Order = question.Order,
            };
        }

        public async Task DeleteQuestion(int id) {
            var question = _context.Questions.Find(id);
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
        }
    }
}
