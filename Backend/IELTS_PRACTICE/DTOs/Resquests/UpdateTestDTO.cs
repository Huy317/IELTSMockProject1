namespace IELTS_PRACTICE.DTOs.Resquests
{
    public class UpdateTestDTO
    {
        public string TestName { get; set; }
        public int CreatedBy { get; set; }
        public string Resource { get; set; }
        public Boolean IsActive { get; set; }
    }
}
