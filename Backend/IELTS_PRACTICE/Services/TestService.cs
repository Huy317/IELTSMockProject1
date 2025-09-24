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
            var tests = await (from t in _context.Tests
                               join u in _context.Users on t.CreatedBy equals u.Id
                               select new TestDTO
                               {
                                   Id = t.Id,
                                   TestName = t.TestName,
                                   CreatedBy = t.CreatedBy,
                                   CreatedAt = t.CreatedAt,
                                   Resource = t.Resource,
                                   IsActive = t.IsActive,
                                   InstructorName = u.FullName,
                                   TypeName = t.TypeSkill.TypeName,
                                   SubmissionCount = t.TestSubmissions.Count(),
                               }).ToListAsync();
            return tests;
        }

        public async Task<TestDTO> GetTestById(int id)
        {
            var tests = await (from t in _context.Tests
                               .Where(x => x.Id == id)
                               join u in _context.Users on t.CreatedBy equals u.Id
                               select new TestDTO
                               {
                                   Id = t.Id,
                                   TestName = t.TestName,
                                   CreatedBy = t.CreatedBy,
                                   CreatedAt = t.CreatedAt,
                                   Resource = t.Resource,
                                   IsActive = t.IsActive,
                                   InstructorName = u.FullName,
                                   TypeName = t.TypeSkill.TypeName,
                                   SubmissionCount = t.TestSubmissions.Count(),
                               }).FirstOrDefaultAsync();
            return tests;
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

        public async Task<List<TestDTO>> FilterTest(List<string>? skillName, List<string>? instructorName, string? search = null, string? sort = null) {
            var query = from t in _context.Tests
                        join u in _context.Users on t.CreatedBy equals u.Id
                        join ts in _context.TypeSkills on t.TypeId equals ts.Id
                        select new { 
                            Test = t, 
                            User = u, 
                            TypeSkill = ts,
                            SubmissionCount = t.TestSubmissions.Count(),
                        };
            // Filter by skill names
            if (skillName != null && skillName.Any())
            {
                query = query.Where(x => skillName.Contains(x.TypeSkill.TypeName));
            }

            // Filter by instructor names
            if (instructorName != null && instructorName.Any())
            {
                query = query.Where(x => instructorName.Contains(x.User.FullName));
            }

            //Filter by sort
            if (sort != null) {
                if (sort.Equals("Least Attempts")) {
                    query = query
                        .OrderBy(x => x.SubmissionCount);
                } else if (sort.Equals("Most Attempts")) {
                    query = query
                        .OrderByDescending(x => x.SubmissionCount);
                }
            }

            //Filter by search
            if(!string.IsNullOrEmpty(search))
            {
                query = query.Where(x => EF.Functions.Like(x.Test.TestName, $"%{search}%"));
            } 

            return await query
                .Select(x => new TestDTO {
                    Id = x.Test.Id,
                    TestName = x.Test.TestName,
                    CreatedBy = x.Test.CreatedBy,
                    CreatedAt = x.Test.CreatedAt,
                    Resource = x.Test.Resource,
                    IsActive = x.Test.IsActive,
                    InstructorName = x.User.FullName,
                    TypeName = x.TypeSkill.TypeName,
                    SubmissionCount = x.SubmissionCount,
                }).ToListAsync();
        }

        public async Task<List<string>> GetAllAuthorNames() { 
            return await _context.Users
                .Where(x => x.Role.Equals("Admin"))
                .Select(x => x.FullName)
                .ToListAsync();
        }

        public async Task<List<TestDTO>> GetTop5PopularTests() {
            return await (from t in _context.Tests
                          join u in _context.Users on t.CreatedBy equals u.Id
                          orderby t.TestSubmissions.Count() descending
                          select new TestDTO
                          {
                              Id = t.Id,
                              TestName = t.TestName,
                              CreatedBy = t.CreatedBy,
                              CreatedAt = t.CreatedAt,
                              Resource = t.Resource,
                              IsActive = t.IsActive,
                              InstructorName = u.FullName,
                              TypeName = t.TypeSkill.TypeName,
                              SubmissionCount = t.TestSubmissions.Count(),
                          })
                          .Take(5)
                          .ToListAsync();
        }

        public async Task<List<TestDTO>> GetTestByAdminId(int id) {
            var tests = await (from t in _context.Tests
                               join u in _context.Users on t.CreatedBy equals u.Id
                               where u.Id == id
                               select new TestDTO
                               {
                                   Id = t.Id,
                                   TestName = t.TestName,
                                   CreatedBy = t.CreatedBy,
                                   CreatedAt = t.CreatedAt,
                                   Resource = t.Resource,
                                   IsActive = t.IsActive,
                                   InstructorName = u.FullName,
                                   TypeName = t.TypeSkill.TypeName,
                                   SubmissionCount = t.TestSubmissions.Count(),
                               })
                               .OrderByDescending(x => x.CreatedAt)
                               .ToListAsync();
            return tests;
        }
    }
}
