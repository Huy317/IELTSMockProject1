using System.ComponentModel.DataAnnotations;

namespace IELTS_PRACTICE.DTOs
{
    public class UserUpdateDto
    {
        [Required(ErrorMessage = "Full name is required.")]
        public string FullName { get; set; } = default!;
        [Required(ErrorMessage = "Email is required."), EmailAddress]
        public string Email { get; set; } = default!;
        [Required(ErrorMessage = "Password is required."), MinLength(8, ErrorMessage = "Password must be at least 6 characters long.")]
        public string Password { get; set; } = default!;
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string? PhoneNumber { get; set; }
    }
}
