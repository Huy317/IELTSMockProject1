using System.ComponentModel.DataAnnotations;

namespace IELTS_API.DTOs
{
    public class CategoryUpdateDTO
    {
        [Required] public string Title { get; set; } = string.Empty;
        [Required] public TimeSpan DurationTime { get; set; }
        [Required] public int QuestionCount { get; set; }
        [Required] public DateTime PublishedYear { get; set; }
    }
}
