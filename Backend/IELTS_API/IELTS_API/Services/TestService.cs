//using IELTS_API.Contexts;
using IELTS_API.DTOs;
using IELTS_API.Models;
using Microsoft.EntityFrameworkCore;

namespace IELTS_API.Services
{
    public class TestService
    {
        private readonly TestContext _context;

        public TestService(TestContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TestDTO>> GetAllAsync()
        {
            return await _context.Tests.Select(t => ToDTO(t)).ToListAsync();
        }

        public async Task<TestDTO?> GetByIdAsync(int id)
        {
            var test = await _context.Tests.FindAsync(id);
            return test == null ? null : ToDTO(test);
        }

        public async Task<TestDTO> CreateAsync(TestCreateDTO dto)
        {
            var test = new Test
            {
                Name = dto.Name,
                Description = dto.Description,
                BandLevel = dto.BandLevel,
                Secret = "default"
            };

            _context.Tests.Add(test);
            await _context.SaveChangesAsync();

            return ToDTO(test);
        }

        public async Task<bool> UpdateAsync(int id, TestUpdateDTO dto)
        {
            var test = await _context.Tests.FindAsync(id);
            if (test == null) return false;

            test.Name = dto.Name;
            test.Description = dto.Description;
            test.BandLevel = dto.BandLevel;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var test = await _context.Tests.FindAsync(id);
            if (test == null) return false;

            _context.Tests.Remove(test);
            await _context.SaveChangesAsync();
            return true;
        }

        public static TestDTO ToDTO(Test test) => new TestDTO
        {
            Id = test.Id,
            Name = test.Name,
            Description = test.Description,
            BandLevel = test.BandLevel
        };

        internal bool Exists(int id)
        {
            throw new NotImplementedException();
        }
    }
}