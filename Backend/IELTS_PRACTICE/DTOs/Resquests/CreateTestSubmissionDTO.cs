namespace IELTS_PRACTICE.DTOs.Resquests
{
    public class CreateTestSubmissionDTO
    {
        public int UserId { get; set; }
        public int TestId { get; set; }
        public DateTime SubmittedAt { get; set; }
        public double Score { get; set; }
    }
}
