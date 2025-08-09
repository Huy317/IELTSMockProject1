namespace IELTS_PRACTICE.Models
{
    public class User
    {
        public int Id { get; set; }
        public String FullName { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public String PhoneNumber { get; set; }
        public String Role { get; set; }
        public DateTime CreatedAt { get; set; }
        //Navigation
        public StudentMetaData StudentMetaData { get; set; }
        public ICollection<TestSubmission> TestSubmissions { get; set; }
    }
}
