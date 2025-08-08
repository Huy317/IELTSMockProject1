namespace IELTS_PRACTICE.Models
{
    public class TestSubmissionDetail
    {
        public int Id { get; set; }
        public int SubmissionId { get; set; }
        public String Feedback {  get; set; }
        public String Answer { get; set; }
    }
}
