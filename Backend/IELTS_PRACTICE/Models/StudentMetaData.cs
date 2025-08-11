namespace IELTS_PRACTICE.Models
{
    public class StudentMetaData
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public double TargetBandScore { get; set; }
        public double CurrentBandScore { get; set; }
        //Navigation
        public User User { get; set; }
    }
}
