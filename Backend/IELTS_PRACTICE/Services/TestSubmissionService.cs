﻿using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace IELTS_PRACTICE.Services
{
    public class TestSubmissionService
    {
        private readonly AppDbContext _context;
        public TestSubmissionService(AppDbContext context) {
            _context = context;
        }

        public async Task<List<TestSubmissionDTO>> GetAllTestSubmission() { 
            return _context.TestSubmissions
                .Select(x => new TestSubmissionDTO { 
                    Id = x.Id,
                    UserId = x.UserId,
                    TestId = x.TestId,
                    SubmittedAt = DateTime.UtcNow,
                    Score = x.Score,
                })
                .ToList();
        }

        public async Task<TestSubmissionDTO> GetTestSubmissionById(int id)
        {
            return _context.TestSubmissions
                .Where(x => x.Id == id)
                .Select(x => new TestSubmissionDTO
                {
                    Id = x.Id,
                    UserId = x.UserId,
                    TestId = x.TestId,
                    SubmittedAt = DateTime.UtcNow,
                    Score = x.Score,
                }).FirstOrDefault();
        }

        public async Task<TestSubmissionDTO> CreateTestSubmission(CreateTestSubmissionDTO rq) {
            var newSubmiss = new TestSubmission
            {
                UserId = rq.UserId,
                TestId = rq.TestId,
                SubmittedAt = DateTime.Now,
                Score = rq.Score,
            };
            _context.TestSubmissions.Add(newSubmiss);
            await _context.SaveChangesAsync();

            return new TestSubmissionDTO
            {
                UserId = newSubmiss.UserId,
                TestId = newSubmiss.TestId,
                SubmittedAt = DateTime.UtcNow,
                Score = newSubmiss.Score,
            };
        }

        public async Task DeleteTestSubmission(int id)
        {
            var test = await _context.TestSubmissions.FindAsync(id);
            _context.TestSubmissions.Remove(test);
            _context.SaveChanges();
        }

        public async Task<List<ViewSubmissionDTO>> ViewRecentlySubmission(int id)
        {
            var result = (from u in _context.Users
                          where u.Id == id
                          join ts in _context.TestSubmissions on u.Id equals ts.UserId
                          join t in _context.Tests on ts.TestId equals t.Id
                          join ins in _context.Users on t.CreatedBy equals ins.Id
                          select new ViewSubmissionDTO
                          {
                              Id = ts.Id,
                              TestName = t.TestName,
                              InstructorName = ins.FullName,
                              Score = ts.Score,
                              TypeName = t.TypeSkill.TypeName,
                          }).ToList();

            return result;
        }

        public async Task<SubmitResponse> SubmitTest(SubmitRequest rq) {
            var submission = new TestSubmission
            {
                UserId = rq.UserId,
                TestId = rq.TestId,
                SubmittedAt = DateTime.Now,
            };

            _context.TestSubmissions.Add(submission);
            await _context.SaveChangesAsync();

            int countCorrect = 0; //as a score, make it like ielts later
            foreach (var (questionId, userAnswer) in rq.UserAnswerMap) {
                var correctAnswer = await _context.Questions
                    .Where(x => x.Id == questionId)
                    .Select(x => x.CorrectAnswer)
                    .FirstOrDefaultAsync();

                if (correctAnswer == userAnswer) {
                    countCorrect++;
                }
                Console.WriteLine(correctAnswer + " " + userAnswer);
            }
            if (countCorrect > 1)
            {
                submission.Score = 6;
            }
            else if (countCorrect > 5)
            {
                submission.Score = 7;
            }
            else if (countCorrect > 10)
            {
                submission.Score = 8;
            }
            else if( countCorrect > 15) {
                submission.Score = 9;
            }

            string jsonAnswer = JsonSerializer.Serialize(rq.UserAnswerMap);

            var submissionDetail = new TestSubmissionDetail
            {
                SubmissionId = submission.Id,
                Feedback = "this is good feedback",
                Answer = jsonAnswer,
            };
            _context.TestSubmissionDetails.Add(submissionDetail);
            await _context.SaveChangesAsync();
            return new SubmitResponse
            {
                UserId = submission.UserId,
                TestId = submission.TestId,
                SubmittedAt = submission.SubmittedAt,
                Score = submission.Score,
                Correct = countCorrect,
                Incorrect = 40 - countCorrect,
                SubmissionId = submission.Id
            };
        }

        public async Task<SubmitResponse> SubmitTest2(SubmitRequest rq)
        {
            var submission = new TestSubmission
            {
                UserId = rq.UserId,
                TestId = rq.TestId,
                SubmittedAt = DateTime.Now,
            };

            _context.TestSubmissions.Add(submission);
            await _context.SaveChangesAsync();

            int countCorrect = 0;

            var currentQuestions = _context.Questions
                .Where(x => x.TestId == submission.TestId)
                .ToList();

            foreach (var (questionId, userAnswer) in rq.UserAnswerMap)
            {
                var correctAnswer = currentQuestions
                    .Where(x => x.Id == questionId)
                    .Select(x => x.CorrectAnswer)
                    .FirstOrDefault();

                if (correctAnswer == userAnswer)
                {
                    countCorrect++;
                }
            }
            submission.Score = CalculateScore(countCorrect);

            string jsonAnswer = JsonSerializer.Serialize(rq.UserAnswerMap);

            var submissionDetail = new TestSubmissionDetail
            {
                SubmissionId = submission.Id,
                Feedback = "this is good feedback",
                Answer = jsonAnswer,
            };
            _context.TestSubmissionDetails.Add(submissionDetail);
            await _context.SaveChangesAsync();
            return new SubmitResponse
            {
                UserId = submission.UserId,
                TestId = submission.TestId,
                SubmittedAt = submission.SubmittedAt,
                Score = submission.Score,
                Correct = countCorrect,
                Incorrect = 40 - countCorrect,
                SubmissionId = submission.Id
            };
        }

        public double CalculateScore(int correct) {
            if (correct >= 39) return 9.0;
            else if (correct >= 37) return 8.5;
            else if (correct >= 35) return 8.0;
            else if (correct >= 32) return 7.5;
            else if (correct >= 30) return 7.0;
            else if (correct >= 26) return 6.5;
            else if (correct >= 23) return 6.0;
            else if (correct >= 18) return 5.5;
            else if (correct >= 16) return 5.0;
            else if (correct >= 13) return 4.5;
            else if (correct >= 10) return 4.0;
            else return 0.0;
        }
    }
}
