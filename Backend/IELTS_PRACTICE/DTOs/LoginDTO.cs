using System.ComponentModel.DataAnnotations;

namespace IELTS_PRACTICE.DTOs
{
    public class LoginDTO
    {
        [Required]
        public String Name { get; set; }
        [Required]
        public String Password { get; set; }
    }
}
