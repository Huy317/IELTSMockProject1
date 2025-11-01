using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.Models;
using Microsoft.EntityFrameworkCore;

namespace IELTS_PRACTICE.Services
{
    public class MediaService
    {
        private readonly AppDbContext _context;
        public MediaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Media>> GetAllMediaAsync()
        {
            return await _context.Media.ToListAsync();
        }

        public async Task<Media> AddMediaAsync(Media media)
        {
            _context.Media.Add(media);
            await _context.SaveChangesAsync();
            return media;
        }

        public async Task<Media?> GetMediaByIdAsync(int id)
        {
            return await _context.Media.FindAsync(id);
        }

        public async Task<Media> UpdateMediaAsync(Media media)
        {
            _context.Media.Update(media);
            await _context.SaveChangesAsync();
            return media;
        }

        public async Task<bool> DeleteMediaAsync(int id)
        {
            var media = await _context.Media.FindAsync(id);
            if (media == null)
            {
                return false;
            }
            _context.Media.Remove(media);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
