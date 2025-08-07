using System.ComponentModel.DataAnnotations;

namespace IELTS_API.Models
{
    public class Category
    {
        [Required] public int Id { get; set; }
        [Required] public string Title { get; set; } = string.Empty;
        [Required] public TimeSpan DurationTime { get; set; }
        [Required] public int QuestionCount { get; set; }
        [Required] public DateTime PublishedYear { get; set; }
        public int ParticipantCount { get; set; }
        public ICollection<Test> Tests { get; set; }

        public Category()
        {
            Tests = new List<Test>();
        }
    }
}
