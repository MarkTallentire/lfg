using System.Security.Authentication;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Interfaces.AuthenticatedUser;
using Domain.Classes;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.AuthenticatedUser
{
    public class AuthenticatedUserService : IAuthenticatedUserService
    {
        private readonly IHttpUserAccessor _userAccessor;
        private readonly UserManager<User> _userManager;

        public AuthenticatedUserService( IHttpUserAccessor userAccessor, UserManager<User> userManager)
        {
            _userAccessor = userAccessor;
            _userManager = userManager;
        }
        
        public async Task<User> GetAuthenticatedUser()
        {
            var currentUserName = _userAccessor.GetCurrentUserName();
            if(currentUserName == null)
                throw new AuthenticationException("you must be authenticated to create a new group");

            var currentUser = await _userManager.Users
                                               .Include(x=>x.Friends)
                                               .SingleOrDefaultAsync(x=>x.UserName == currentUserName);
            if (currentUser == null)
                throw new AuthenticationException("you must be authenticated to create a new group");

            return currentUser;
        }
    }
}