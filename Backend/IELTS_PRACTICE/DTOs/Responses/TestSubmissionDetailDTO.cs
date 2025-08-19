namespace IELTS_PRACTICE.DTOs.Responses
{
    public class TestSubmissionDetailDTO
    {
        public int Id { get; set; }
        public int SubmissionId { get; set; }
        public string Feedback { get; set; }
        public string Answer { get; set; }
    }
}
