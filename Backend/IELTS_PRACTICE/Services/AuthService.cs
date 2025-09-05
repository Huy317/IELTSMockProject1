using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Models;

namespace IELTS_PRACTICE.Services
{
    public class AuthService
    {
        private readonly UserService _userService;
        private readonly JwtService _jwtService;
        public AuthService(UserService userService, JwtService jwtService) {
            _userService = userService;
            _jwtService = jwtService;
        }

        public async Task<AuthResponseDTO> Login(LoginRequesDTO rq) {
            var user = await _userService.FindUserByEmail(rq.Email);
            if (user == null) return null;
            var isPasswordValid = await _userService.CheckPassword(user, rq.Password);
            if (!isPasswordValid) return null;

            var token = _jwtService.GenerateToken(user);
            return new AuthResponseDTO
            {
                Token = token,
                Email = user.Email,
                Role = user.Role,
            };
        }

        public async Task<bool> Register(UserCreateDto rq) {
            var exist = await _userService.FindUserByEmail(rq.Email);
            if(exist != null) return false;

            await _userService.CreateUserAsync(rq);
            return true;
        }
    }
}
