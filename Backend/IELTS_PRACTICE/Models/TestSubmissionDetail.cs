namespace IELTS_PRACTICE.Models
{
    public class TestSubmissionDetail
    {
        public int Id { get; set; }
        public int SubmissionId { get; set; }
        public string Feedback {  get; set; }
        public string Answer { get; set; }
        //Navigation
        public TestSubmission TestSubmission { get; set; }
    }
}
