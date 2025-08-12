namespace IELTS_PRACTICE.DTOs.Responses
{
    public class StudentBasicDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public double TargetBandScore { get; set; }
        public double CurrentBandScore { get; set; }
    }
}
