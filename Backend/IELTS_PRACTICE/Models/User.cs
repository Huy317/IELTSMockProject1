namespace IELTS_PRACTICE.Models
{
    public class User
    {
        public int Id { get; set; }
        public String UserName { get; set; }
        public String FullName { get; set; }
        public String Email { get; set; }
        public String HashPassword { get; set; }
        public String PhoneNumber { get; set; }
        public String Role { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
