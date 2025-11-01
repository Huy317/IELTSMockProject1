using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel.DataAnnotations;

namespace IELTS_PRACTICE.Models
{
    public class Media
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string OriginalFileName { get; set; }
        [Required]
        public string FileName { get; set; }

        [Required]
        public string FilePath { get; set; }

        [Required]
        public string FileUrl { get; set; }

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}
