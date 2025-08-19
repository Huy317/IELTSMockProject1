namespace IELTS_PRACTICE.DTOs.Responses
{
    public class TestDTO
    {
        public int Id { get; set; }
        public string TestName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Resource { get; set; }
        public Boolean IsActive { get; set; }
    }
}
