using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;
using IELTS_PRACTICE.Services;
using Microsoft.AspNetCore.Mvc;

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        public AuthController(AuthService authService) { 
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserCreateDto rq) { 
            var result = await _authService.Register(rq);
            if (result == false) {
                return BadRequest("Email already existed");
            }
            return Ok("Register successfully");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequesDTO rq) { 
            var response = await _authService.Login(rq);
            if (response == null) {
                return Unauthorized("Invalid Email or Password");
            }
            return Ok(response);
        }
    }
}
