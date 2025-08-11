namespace IELTS_PRACTICE.DTOs
{
    public class UserDetailDto : UserBasicDto
    {
        public StudentBasicDto? StudentDetail { get; set; }
    }
}
