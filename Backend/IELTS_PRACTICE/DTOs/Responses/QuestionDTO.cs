namespace IELTS_PRACTICE.DTOs.Responses
{
    public class QuestionDTO
    {
        public int Id { get; set; }
        public string QuestionType { get; set; }
        public string Content { get; set; }
        public string CorrectAnswer { get; set; }
        public string Choices { get; set; }
        public string Explanation { get; set; }
        public int TestId { get; set; }
        public int Order { get; set; }
    }
}
