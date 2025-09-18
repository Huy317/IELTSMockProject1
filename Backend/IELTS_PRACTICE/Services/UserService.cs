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
                // Require current password to change to a new password
                if (string.IsNullOrEmpty(userDto.CurrentPassword)) {
                    throw new Exception("Current password is required to change password.");
                }

                // Verify current password
                var isCurrentPasswordValid = await CheckPassword(user, userDto.CurrentPassword);
                if (!isCurrentPasswordValid) {
                    throw new Exception("Current password is incorrect.");
                }

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

        public async Task<User> FindUserByEmail(string email) {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<bool> CheckPassword(User user, string password) {
            var result = _passwordHasher.VerifyHashedPassword(user, user.Password, password);
            return result == PasswordVerificationResult.Success
                    || result == PasswordVerificationResult.SuccessRehashNeeded;
            //allow when enter correct password even 
        }

        public async Task<int> TotalSubmission(int userId) {
            return await _context.TestSubmissions
                .Where(x => x.UserId == userId)
                .CountAsync();
        }

        public async Task<double> AverageScore(int userId) {
            var avr = await _context.TestSubmissions
                .Where(x => x.UserId == userId)
                .AverageAsync(x => x.Score);

            return Rouded(avr);
        }

        public async Task<double> GetHighestScore(int userId) {
            var avr = await _context.TestSubmissions
                .Where(x => x.UserId == userId)
                .MaxAsync(x => x.Score);
            return Rouded(avr);
        }

        public async Task<double> GetLowestScore(int userId)
        {
            var avr = await _context.TestSubmissions
                .Where(x => x.UserId == userId)
                .MinAsync(x => x.Score);
            return Rouded(avr);
        }

        public double Rouded(double avr) {
            var integer = Math.Floor(avr);
            var dec = avr - integer;

            double rounded;
            if (dec < 0.125)
            {
                rounded = integer; // .0
            }
            else if (dec < 0.75)
            {
                rounded = integer + 0.5; // .5
            }
            else
            {
                rounded = integer + 1.0; // next whole number
            }
            return rounded;
        }
    }
}
