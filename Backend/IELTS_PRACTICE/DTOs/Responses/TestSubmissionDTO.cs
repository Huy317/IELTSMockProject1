namespace IELTS_PRACTICE.DTOs.Responses
{
    public class TestSubmissionDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TestId { get; set; }
        public DateTime SubmittedAt { get; set; }
        public double Score { get; set; }
    }
}
