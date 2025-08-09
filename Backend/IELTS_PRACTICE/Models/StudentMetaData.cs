namespace IELTS_PRACTICE.Models
{
    public class StudentMetaData
    {
        public String Id { get; set; }
        public String UserId { get; set; }
        public double TargetBandScore { get; set; }
        public double CurrentBandScore { get; set; }
        //Navigation
        public User User { get; set; }
    }
}
