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

namespace IELTS_PRACTICE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly StudentService _studentService;

        public UsersController(StudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet("GetAllUser")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            return await _studentService.GetAllUser();
        }

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
        public async Task<ActionResult<User>> CreateUser(CreateUserRequest request)
        {     
            await _studentService.CreateUser(request);
            return Ok();
        }

        [HttpDelete("DeleteUser")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            await _studentService.DeleteUser(id);
            return Ok();
        }
    }
}
