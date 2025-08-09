namespace IELTS_PRACTICE.Models
{
    public class Question
    {
        public int Id { get; set; }
        public String QuestionType { get; set; }
        public String Content { get; set; }
        public String CorrectAnswer {  get; set; }
        public String Choices {  get; set; }
        public String Explanation { get; set; }
        public int ParentId { get; set; }
        public int TypeId { get; set; }
        public int TestId { get; set; }
        public String Link { get; set; }

        //Navigation
        public Type Type { get; set; }
        public Test Test { get; set; }
    }
}
