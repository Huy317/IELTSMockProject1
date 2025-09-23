using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Models;
using Microsoft.EntityFrameworkCore;

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
    }
}
