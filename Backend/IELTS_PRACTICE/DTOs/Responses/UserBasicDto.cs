namespace IELTS_PRACTICE.DTOs.Responses
{
    public class UserBasicDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string? PhoneNumber { get; set; }
        public string Role { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
    }
}
