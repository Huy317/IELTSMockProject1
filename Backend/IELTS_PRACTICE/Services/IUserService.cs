using IELTS_PRACTICE.DTOs.Responses;
using IELTS_PRACTICE.DTOs.Resquests;

namespace IELTS_PRACTICE.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserBasicDto>> GetAllUsersAsync();
        Task<UserBasicDto> GetUserByIdAsync(int userId);
        Task<UserBasicDto> CreateUserAsync(UserCreateDto userDto);
        Task<bool> UpdateUserAsync(int userId, UserUpdateDto userDto);
        Task<bool> DeleteUserAsync(int userId);
    }
}
