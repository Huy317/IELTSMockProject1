using Microsoft.AspNetCore.Mvc;
using IELTS_PRACTICE.Services;
using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;

namespace IELTS_PRACTICE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TypeSkillController : ControllerBase
    {
        private readonly TypeSkillService _typeSkillService;

        public TypeSkillController(TypeSkillService typeSkillService)
        {
            _typeSkillService = typeSkillService;
        }

        // GET: api/TypeSkill
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TypeSkillBasicDto>>> GetTypeSkills()
        {
            var typeSkills = await _typeSkillService.GetAllTypeSkillsAsync();
            return Ok(typeSkills);
        }

        // GET: api/TypeSkill/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TypeSkillBasicDto>> GetTypeSkill(int id)
        {
            var typeSkill = await _typeSkillService.GetTypeSkillByIdAsync(id);
            if (typeSkill == null)
            {
                return NotFound();
            }
            return Ok(typeSkill);
        }

        // POST: api/TypeSkill
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TypeSkillBasicDto>> PostTypeSkill(TypeSkillCreateDto typeSkillDto)
        {
            var createdTypeSkill = await _typeSkillService.CreateTypeSkillAsync(typeSkillDto);
            return CreatedAtAction("GetTypeSkill", new { id = createdTypeSkill.Id }, createdTypeSkill);
        }

        // PUT: api/TypeSkill/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTypeSkill(int id, TypeSkillUpdateDto typeSkillDto)
        {
            var updatedTypeSkill = await _typeSkillService.UpdateTypeSkillAsync(id, typeSkillDto);
            if (updatedTypeSkill == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        // DELETE: api/TypeSkill/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTypeSkill(int id)
        {
            var deleted = await _typeSkillService.DeleteTypeSkillAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
