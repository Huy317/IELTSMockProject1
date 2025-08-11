namespace IELTS_PRACTICE.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = default!;
        public string Email { get; set; } = default!;
        public string Password { get; set; } = default!;
        public string? PhoneNumber { get; set; }
        public string Role { get; set; } = default!;
        public DateTime CreatedAt { get; set; }
        //Navigation
        public StudentMetaData? StudentMetaData { get; set; }
        public ICollection<TestSubmission>? TestSubmissions { get; set; }
    }
}
