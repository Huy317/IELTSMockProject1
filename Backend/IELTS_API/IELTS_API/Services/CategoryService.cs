using IELTS_API.Models;
using IELTS_API.DTOs;
using IELTS_API.Contexts;
using Microsoft.EntityFrameworkCore;

namespace IELTS_API.Services
{
    public class CategoryService
    {
        private readonly CategoryContext _context;

        public CategoryService(CategoryContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Category> CreateCategoryAsync(CategoryCreateDTO dto)
        {
            var category = new Category
            {
                Title = dto.Title,
                DurationTime = dto.DurationTime,
                PublishedYear = DateTime.UtcNow,
                ParticipantCount = 0,
                QuestionCount = 0
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<Category?> UpdateCategoryAsync(int id, CategoryUpdateDTO dto)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return null;
            if (!string.IsNullOrEmpty(dto.Title))
            {
                category.Title = dto.Title;
            }
            category.DurationTime = dto.DurationTime;
            category.QuestionCount = dto.QuestionCount;
            category.PublishedYear = dto.PublishedYear;
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}