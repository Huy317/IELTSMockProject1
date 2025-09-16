namespace IELTS_PRACTICE.DTOs.Resquests
{
    public class CreateQuestionDTO
    {
        public string QuestionType { get; set; }
        public string Content { get; set; }
        public string CorrectAnswer { get; set; }
        public string Choices { get; set; }
        public string Explanation { get; set; }
        public int ParentId { get; set; }
        //public int TypeId { get; set; }
        public int TestId { get; set; }
        public string Link { get; set; }
    }
}
