namespace IELTS_PRACTICE.Models
{
    public class Test
    {
        public int Id { get; set; }
        public String TestName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public String Resource { get; set; }
        public Boolean IsActive { get; set; }
        //Navigation
        public ICollection<Question> Questions { get; set; }
        public ICollection<TestSubmission> TestSubmissions { get; set; }
    }
}
