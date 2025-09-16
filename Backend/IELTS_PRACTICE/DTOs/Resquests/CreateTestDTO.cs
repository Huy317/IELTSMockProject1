namespace IELTS_PRACTICE.DTOs.Resquests
{
    public class CreateTestDTO
    {
        public string TestName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Resource { get; set; }
        public int TypeId { get; set; }
        public bool IsActive { get; set; }
    }
}
