namespace IELTS_PRACTICE.DTOs.Responses
{
    public class SubmitResponse
    {
        public int TestId { get; set; }
        public int UserId { get; set; }
        public double Score { get; set; }
        public int Correct { get; set; }
        public int Incorrect { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}
