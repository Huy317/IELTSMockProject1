using System.ComponentModel.DataAnnotations;

namespace IELTS_PRACTICE.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; } = new Guid();
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
