namespace IELTS_PRACTICE.Models
{
    public class TestSubmission
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TestId { get; set; }
        public DateTime SubmittedAt {  get; set; }
        public double Score { get; set; }
        //Navigation
        public User User { get; set; }
        public Test Test { get; set; }
        public TestSubmissionDetail TestSubmissionDetail { get; set; }
    }
}
