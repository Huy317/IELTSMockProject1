namespace IELTS_PRACTICE.Models
{
    public class TypeSkill
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
        public string Duration { get; set; }
        //Navigation
        //public ICollection<Question> Questions { get; set; }
        public ICollection<Test> Tests { get; set; }
    }
}
