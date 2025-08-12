using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.Models;
using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using Microsoft.EntityFrameworkCore;

namespace IELTS_PRACTICE.Services
{
    public class TypeSkillService
    {
        private readonly AppDbContext _context;

        public TypeSkillService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TypeSkillBasicDto>> GetAllTypeSkillsAsync()
        {
            return await _context.TypeSkills
                .Select(ts => new TypeSkillBasicDto
                {
                    Id = ts.Id,
                    TypeName = ts.TypeName,
                    Duration = ts.Duration
                })
                .ToListAsync();
        }

        public async Task<TypeSkillBasicDto?> GetTypeSkillByIdAsync(int id)
        {
            return await _context.TypeSkills
                .Where(ts => ts.Id == id)
                .Select(ts => new TypeSkillBasicDto
                {
                    Id = ts.Id,
                    TypeName = ts.TypeName,
                    Duration = ts.Duration
                })
                .FirstOrDefaultAsync();
        }

        public async Task<TypeSkillBasicDto> CreateTypeSkillAsync(TypeSkillCreateDto typeSkillCreateDto)
        {
            var typeSkill = new TypeSkill
            {
                TypeName = typeSkillCreateDto.TypeName,
                Duration = typeSkillCreateDto.Duration
            };

            _context.TypeSkills.Add(typeSkill);
            await _context.SaveChangesAsync();

            return new TypeSkillBasicDto
            {
                Id = typeSkill.Id,
                TypeName = typeSkill.TypeName,
                Duration = typeSkill.Duration
            };
        }

        public async Task<TypeSkillBasicDto> UpdateTypeSkillAsync(int id, TypeSkillUpdateDto typeSkillUpdateDto)
        {
            var typeSkill = await _context.TypeSkills.FindAsync(id);
            if (typeSkill == null)
            {
                return null;
            }

            typeSkill.TypeName = typeSkillUpdateDto.TypeName;
            typeSkill.Duration = typeSkillUpdateDto.Duration;

            _context.TypeSkills.Update(typeSkill);
            await _context.SaveChangesAsync();

            return new TypeSkillBasicDto
            {
                Id = typeSkill.Id,
                TypeName = typeSkill.TypeName,
                Duration = typeSkill.Duration
            };
        }

        public async Task<bool> DeleteTypeSkillAsync(int id)
        {
            var typeSkill = await _context.TypeSkills.FindAsync(id);
            if (typeSkill == null)
            {
                return false;
            }

            _context.TypeSkills.Remove(typeSkill);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
