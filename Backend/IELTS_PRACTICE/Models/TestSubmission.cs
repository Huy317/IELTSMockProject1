namespace IELTS_PRACTICE.Models
{
    public class TestSubmission
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TestId { get; set; }
        public DateTime Time {  get; set; }

        public double Score { get; set; }
    }
}
