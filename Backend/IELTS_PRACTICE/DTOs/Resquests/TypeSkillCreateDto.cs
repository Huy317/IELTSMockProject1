using System.ComponentModel.DataAnnotations;

namespace IELTS_PRACTICE.DTOs.Resquests
{
    public class TypeSkillCreateDto
    {
        [Required]
        public string TypeName { get; set; } = default!;
        [Required]
        public string Duration { get; set; } = default!;
    }
}
