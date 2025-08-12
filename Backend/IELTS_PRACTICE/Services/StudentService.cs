using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.Models;
using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using Microsoft.EntityFrameworkCore;

namespace IELTS_PRACTICE.Services
{
    public class StudentService
    {
        private readonly AppDbContext _context;

        public StudentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<StudentBasicDto>> GetAllStudentsAsync()
        {
            return await _context.StudentMetaDatas
                .Select(s => new StudentBasicDto
                {
                    Id = s.Id,
                    UserId = s.UserId,
                    TargetBandScore = s.TargetBandScore,
                    CurrentBandScore = s.CurrentBandScore
                })
                .ToListAsync();
        }

        public async Task<StudentBasicDto?> GetStudentByIdAsync(int id)
        {
            return await _context.StudentMetaDatas
                .Where(s => s.Id == id)
                .Select(s => new StudentBasicDto
                {
                    Id = s.Id,
                    UserId = s.UserId,
                    TargetBandScore = s.TargetBandScore,
                    CurrentBandScore = s.CurrentBandScore
                })
                .FirstOrDefaultAsync();
        }

        public async Task<StudentBasicDto> CreateStudentAsync(StudentCreateDto studentCreateDto)
        {
            var student = new StudentMetaData
            {
                UserId = studentCreateDto.UserId,
                TargetBandScore = studentCreateDto.TargetBandScore,
                CurrentBandScore = studentCreateDto.CurrentBandScore
            };

            _context.StudentMetaDatas.Add(student);
            await _context.SaveChangesAsync();

            return new StudentBasicDto
            {
                Id = student.Id,
                UserId = student.UserId,
                TargetBandScore = student.TargetBandScore,
                CurrentBandScore = student.CurrentBandScore
            };
        }

        public async Task<StudentBasicDto?> UpdateStudentAsync(int id, StudentUpdateDto studentUpdateDto)
        {
            var student = await _context.StudentMetaDatas.FindAsync(id);
            if (student == null)
            {
                return null;
            }

            student.TargetBandScore = studentUpdateDto.TargetBandScore;

            _context.StudentMetaDatas.Update(student);
            await _context.SaveChangesAsync();

            return new StudentBasicDto
            {
                Id = student.Id,
                UserId = student.UserId,
                TargetBandScore = student.TargetBandScore,
                CurrentBandScore = student.CurrentBandScore
            };
        }

        public async Task<bool> DeleteStudentAsync(int id)
        {
            var student = await _context.StudentMetaDatas.FindAsync(id);
            if (student == null)
            {
                return false;
            }

            _context.StudentMetaDatas.Remove(student);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
