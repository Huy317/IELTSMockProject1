namespace IELTS_PRACTICE.Models
{
    public class Test
    {
        public int Id { get; set; }
        public string TestName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Resource { get; set; }
        public Boolean IsActive { get; set; }
        public int TypeId { get; set; }
        //Navigation
        public TypeSkill TypeSkill { get; set; }
        public ICollection<Question> Questions { get; set; }
        public ICollection<TestSubmission> TestSubmissions { get; set; }
    }
}
