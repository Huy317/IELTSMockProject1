using IELTS_PRACTICE.Context;
using IELTS_PRACTICE.DTOs;
using IELTS_PRACTICE.Models;
using IELTS_PRACTICE.Requests;

namespace IELTS_PRACTICE.Services
{
    public class StudentService
    {
        private readonly AppDbContext _context;
        public StudentService(AppDbContext context) { 
            _context = context;
        }
        public async Task<List<User>> GetAllUser() { 
            return _context.Users.ToList();
        }

        public async Task<User> GetUserByID(Guid id) {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> UpdateUser(Guid id ,User newUser) {
            if (id != newUser.Id) return null;
            var currentUser = await _context.Users.FindAsync(id);
            currentUser.Name = newUser.Name;
            currentUser.Email = newUser.Email;
            currentUser.Password = newUser.Password;
            currentUser.Role = newUser.Role;
            _context.SaveChanges();
            return currentUser;
        }

        public async Task<User> CreateUser(CreateUserDTO request) {
            var user = new User {
                Id = new Guid(),
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
                Role = request.Role,
            };
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public async Task DeleteUser(Guid id) {
            var user = await _context.Users.FindAsync(id);
            _context.Users.Remove(user);
            _context.SaveChanges();
        }

        public User Login(LoginDTO request) { 
            return _context.Users.FirstOrDefault(x => x.Name == request.Name && x.Password == request.Password);
        }
    }
}
