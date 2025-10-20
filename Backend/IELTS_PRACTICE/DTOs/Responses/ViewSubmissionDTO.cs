namespace IELTS_PRACTICE.DTOs.Responses
{
    public class ViewSubmissionDTO
    {
        public int Id { get; set; }
        public string TestName { get; set; }
        public string InstructorName { get; set; }
        public string TypeName { get; set; }
        public double Score { get; set; }
        public DateTime SubmittedAt { get; set; }
    }
}
