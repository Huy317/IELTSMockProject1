using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IELTS_API.Models;
using IELTS_API.DTOs;
using IELTS_API.Contexts;

namespace IELTS_API.Controllers
{
    [Route("api/Tests")]
    [ApiController]
    public class TestsController : ControllerBase
    {
        private readonly TestContext _context;

        public TestsController(TestContext context)
        {
            _context = context;
        }

        // GET: api/Tests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestDTO>>> GetTests()
        {
            return await _context.Tests.Select(t => ItemDTO(t)).ToListAsync();
        }

        // GET: api/Tests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TestDTO>> GetTest(int id)
        {
            var test = await _context.Tests.FindAsync(id);

            if (test == null)
            {
                return NotFound();
            }

            return ItemDTO(test);
        }

        // PUT: api/Tests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTest(int id, TestUpdateDTO dto)
        {
            var test = await _context.Tests.FindAsync(id);
            if(test == null)
            {
                return NotFound();
            }

            test.Name = dto.Name;
            test.Description = dto.Description;
            test.BandLevel = dto.BandLevel;

            await _context.SaveChangesAsync();

            return NoContent();

            //if (id != test.Id)
            //{
            //    return BadRequest();
            //}

            //_context.Entry(test).State = EntityState.Modified;

            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!TestExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            //return NoContent();
        }

        // POST: api/Tests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TestDTO>> PostTest(TestCreateDTO dto)
        {
            var test = new Test
            {
                Name = dto.Name,
                Description = dto.Description,
                BandLevel = dto.BandLevel,
                Secret = "default"
            };

            _context.Tests.Add(test);
            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetTest", new { id = test.Id }, test);
            return CreatedAtAction(nameof(GetTest), new { id = test.Id }, ItemDTO(test));
        }

        // DELETE: api/Tests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest(int id)
        {
            var test = await _context.Tests.FindAsync(id);
            if (test == null)
            {
                return NotFound();
            }

            _context.Tests.Remove(test);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TestExists(int id)
        {
            return _context.Tests.Any(e => e.Id == id);
        }

        private static TestDTO ItemDTO(Test test) => new TestDTO
        {
            Id = test.Id,
            Name = test.Name,
            Description = test.Description,
            BandLevel = test.BandLevel
        };
    }
}
