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
                    TestName = x.TestName,
                    CreatedBy = x.CreatedBy,
                    CreatedAt = x.CreatedAt,
                    Resource = x.Resource,
                }).ToList();
            return tests;
        }

        public async Task<TestDTO> GetTestById(int id)
        {
            return await _context.Tests
                .Where(x => x.Id == id)
                .Select(x => new TestDTO
                {
                    TestName = x.TestName,
                    CreatedBy = x.CreatedBy,
                    CreatedAt = x.CreatedAt,
                    Resource = x.Resource,
                })
                .FirstOrDefaultAsync();
        }

        public async Task<TestDTO> CreateTest(CreateTestDTO rq) {
            var newTest = new Test
            {
                TestName = rq.TestName,
                CreatedBy = rq.CreatedBy,
                CreatedAt = rq.CreatedAt,
                Resource = rq.Resource,
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
            };
        }

        public async Task DeleteTest(int id) { 
            var test = await _context.Tests.FindAsync(id);
            _context.Tests.Remove(test);
            _context.SaveChanges();
        }
    }
}
