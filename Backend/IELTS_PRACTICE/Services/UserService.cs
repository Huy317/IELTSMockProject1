using IELTS_PRACTICE.Contexts;
using IELTS_PRACTICE.Models;
using Microsoft.EntityFrameworkCore;
using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using Microsoft.AspNetCore.Identity;

namespace IELTS_PRACTICE.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher = new();

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserBasicDto>> GetAllUsersAsync()
        {
            return await _context.Users
                .Select(user => new UserBasicDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<UserBasicDto?> GetUserByIdAsync(int userId)
        {
            return await _context.Users
                .Where(user => user.Id == userId)
                .Select(user => new UserBasicDto
                {
                    Id = user.Id,
                    FullName = user.FullName,
                    Email = user.Email,
                    PhoneNumber = user.PhoneNumber,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                })
                .FirstOrDefaultAsync();
        }

        public async Task<UserBasicDto> CreateUserAsync(UserCreateDto userDto)
        {
            var user = new User
            {
                FullName = userDto.FullName,
                Email = userDto.Email,
                Password = _passwordHasher.HashPassword(null!, userDto.Password), // Ensure password is hashed in a real application
                PhoneNumber = userDto.PhoneNumber,
                Role = userDto.Role,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserBasicDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<UserBasicDto?> UpdateUserAsync(int userId, UserUpdateDto userDto)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return null; // User not found
            }

            user.FullName = userDto.FullName;
            user.Email = userDto.Email;
            
            // Only update password if it's provided
            if (!string.IsNullOrEmpty(userDto.Password))
            {
                user.Password = _passwordHasher.HashPassword(null!, userDto.Password);
            }
            
            user.PhoneNumber = userDto.PhoneNumber;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return new UserBasicDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<bool> DeleteUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return false; // User not found
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
