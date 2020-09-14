using System.Threading.Tasks;
using Domain.Classes;

namespace Application.Interfaces.AuthenticatedUser
{
    public interface IAuthenticatedUserService
    {
        Task<User> GetAuthenticatedUser();
    }
}