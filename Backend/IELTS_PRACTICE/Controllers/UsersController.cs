using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IELTS_PRACTICE.Context;
using IELTS_PRACTICE.Models;
using IELTS_PRACTICE.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using IELTS_PRACTICE.Requests;
using Microsoft.AspNetCore.Identity.Data;
using IELTS_PRACTICE.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly StudentService _studentService;
        private readonly JwtTokenHelper _jwt;

        public UsersController(StudentService studentService, JwtTokenHelper jwt)
        {
            _studentService = studentService;
            _jwt = jwt;
        }

        [HttpGet("GetAllUser")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            return await _studentService.GetAllUser();
        }

        [Authorize(Roles = "admin,staff")]
        [HttpGet("GetUserByID")]
        public async Task<ActionResult<User>> GetUserByID(Guid id)
        {
            var currentUser = await _studentService.GetUserByID(id);
            if (currentUser == null) { 
                return NotFound();
            }

            return Ok(currentUser);
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(Guid id, User user)
        {
            var currentUser = await _studentService.UpdateUser(id, user);
            if (currentUser == null) {
                return NotFound();
            }

            return Ok(currentUser);
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<User>> CreateUser(CreateUserDTO request)
        {     
            await _studentService.CreateUser(request);
            return Ok();
        }

        [Authorize(Roles = "staff")]
        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            await _studentService.DeleteUser(id);
            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO request)
        {
            var user = _studentService.Login(request);
            if (user == null)
            {
                return Unauthorized();
            }

            var token = _jwt.GenerateToken(user);
            return Ok(token);
        }
    }
}
