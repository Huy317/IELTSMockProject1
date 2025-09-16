using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Models;
using Microsoft.EntityFrameworkCore;

namespace IELTS_PRACTICE.Services
{
    public class TestService
    {
        private readonly AppDbContext _context;
        public TestService(AppDbContext context) { 
            _context = context;
        }

        public async Task<List<TestDTO>> GetAllTest() { 
            var tests = _context.Tests
                .Select(x => new TestDTO {
                    Id = x.Id,
                    TestName = x.TestName,
                    CreatedBy = x.CreatedBy,
                    CreatedAt = x.CreatedAt,
                    Resource = x.Resource,
                    IsActive = x.IsActive,
                }).ToList();
            return tests;
        }

        public async Task<TestDTO> GetTestById(int id)
        {
            return await _context.Tests
                .Where(x => x.Id == id)
                .Select(x => new TestDTO
                {
                    Id = x.Id,
                    TestName = x.TestName,
                    CreatedBy = x.CreatedBy,
                    CreatedAt = x.CreatedAt,
                    Resource = x.Resource,
                    IsActive = x.IsActive,
                })
                .FirstOrDefaultAsync();
        }

        public async Task<TestDTO> UpdateTest(int id, UpdateTestDTO rq) {
            var testt = await _context.Tests.FindAsync(id);
            if (testt == null) return null;
            testt.TestName = rq.TestName;
            testt.CreatedBy = rq.CreatedBy;
            testt.Resource = rq.Resource;
            testt.IsActive = rq.IsActive;

            _context.Tests.Update(testt);
            _context.SaveChanges();
            return new TestDTO
            {
                Id = testt.Id,
                CreatedBy = testt.CreatedBy,
                CreatedAt = testt.CreatedAt,
                Resource = testt.Resource,
                IsActive = testt.IsActive,
            };
        }

        public async Task<TestDTO> CreateTest(CreateTestDTO rq) {
            var newTest = new Test
            {
                TestName = rq.TestName,
                CreatedBy = rq.CreatedBy,
                CreatedAt = rq.CreatedAt,
                Resource = rq.Resource,
                TypeId = rq.TypeId,
                IsActive = rq.IsActive,
            };

            _context.Tests.Add(newTest);
            _context.SaveChanges();
            return new TestDTO
            {
                TestName = newTest.TestName,
                CreatedBy = newTest.CreatedBy,
                CreatedAt = newTest.CreatedAt,
                Resource = newTest.Resource,
                IsActive = newTest.IsActive,
            };
        }

        public async Task DeleteTest(int id) { 
            var test = await _context.Tests.FindAsync(id);
            _context.Tests.Remove(test);
            _context.SaveChanges();
        }

        public async Task<List<TestDTO>> FilterTest(string? skillName, string? instructorName) {
            var query = from t in _context.Tests
                        join u in _context.Users on t.CreatedBy equals u.Id
                        select new { Test = t, User = u };

            if (!string.IsNullOrEmpty(skillName))
            {
                query = query.Where(x => EF.Functions.Like(x.Test.TestName, $"%{skillName}%"));
            }

            if (!string.IsNullOrEmpty(instructorName))
            {
                query = query
                    .Where(x => EF.Functions.Like(x.User.FullName, instructorName));
            }

            return await query
                .Select(x => new TestDTO {
                    Id = x.Test.Id,
                    TestName = x.Test.TestName,
                    CreatedBy = x.Test.CreatedBy,
                    CreatedAt = x.Test.CreatedAt,
                    Resource = x.Test.Resource,
                    IsActive = x.Test.IsActive,
                }).ToListAsync();
        }

        public async Task<List<string>> GetAllAuthorNames() { 
            return await _context.Users
                .Where(x => x.Role.Equals("Admin"))
                .Select(x => x.FullName)
                .ToListAsync();
        }
    }
}
