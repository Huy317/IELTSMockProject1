namespace IELTS_PRACTICE.DTOs.Responses
{
    public class StudentDetailDto: StudentBasicDto
    {
        public UserBasicDto UserDetail { get; set; }
    }
}
