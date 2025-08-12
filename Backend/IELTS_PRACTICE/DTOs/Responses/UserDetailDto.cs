namespace IELTS_PRACTICE.DTOs.Responses
{
    public class UserDetailDto : UserBasicDto
    {
        public StudentBasicDto? StudentDetail { get; set; }
    }
}
