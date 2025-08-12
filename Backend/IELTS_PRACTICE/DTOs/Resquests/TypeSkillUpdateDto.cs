using System.ComponentModel.DataAnnotations;

namespace IELTS_PRACTICE.DTOs.Resquests
{
    public class TypeSkillUpdateDto
    {
        [Required]
        public string TypeName { get; set; } = default!;
        [Required]
        public string Duration { get; set; } = default!;
    }
}
