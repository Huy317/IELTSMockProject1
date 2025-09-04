namespace IELTS_PRACTICE.DTOs.Resquests
{
    public class UpdateQuestionDTO
    {
        public string? QuestionType { get; set; }
        public string? Content { get; set; }
        public string? CorrectAnswer { get; set; }
        public string? Choices { get; set; }
        public string? Explanation { get; set; }
        public string? Link { get; set; }

    }
}
