namespace IELTS_PRACTICE.DTOs.Responses
{
    public class QuestionDTO
    {
        public string QuestionType { get; set; }
        public string Content { get; set; }
        public string CorrectAnswer { get; set; }
        public string Choices { get; set; }
        public string Explanation { get; set; }
    }
}
