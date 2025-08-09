namespace IELTS_PRACTICE.Models
{
    public class Type
    {
        public int Id { get; set; }
        public String TypeName { get; set; }
        public String Duration { get; set; }
        //Navigation
        public ICollection<Question> Questions { get; set; }
    }
}
