namespace IELTS_PRACTICE.DTOs.Resquests
{
    public class SubmitRequest
    {
        public int UserId { get; set; }
        public int TestId { get; set; }
        public Dictionary<int, string> UserAnswerMap { get; set; }
    }
}
