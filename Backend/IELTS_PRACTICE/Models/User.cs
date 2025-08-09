namespace IELTS_PRACTICE.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }
        public DateTime CreatedAt { get; set; }
        //Navigation
        public StudentMetaData StudentMetaData { get; set; }
        public ICollection<TestSubmission> TestSubmissions { get; set; }
    }
}
