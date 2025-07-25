using System.ComponentModel.DataAnnotations;

namespace IELTS_PRACTICE.Requests
{
    public class CreateUserRequest
    {
        [Required]
        public String Name { get; set; }
        [Required]
        public String Email { get; set; }
        [Required]
        public String Password { get; set; }
        [Required]
        public String Role { get; set; }
    }
}
