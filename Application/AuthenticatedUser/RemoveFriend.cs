using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces.AuthenticatedUser;
using Domain.Classes;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.AuthenticatedUser
{
    public class RemoveFriend
    {
        public class Request : IRequest<Unit>
        {
            public string FriendId { get; set; }
        }


        public class IRequest : IRequestHandler<Request, Unit>
        {
            private readonly IAuthenticatedUserService _authenticatedUserService;
            private readonly UserManager<User> _userManager;

            public IRequest(IAuthenticatedUserService authenticatedUserService, UserManager<User> userManager)
            {
                _authenticatedUserService = authenticatedUserService;
                _userManager = userManager;
            }


            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var currentUser = await _authenticatedUserService.GetAuthenticatedUser();
                currentUser.RemoveFriend(request.FriendId);
                
                await _userManager.UpdateAsync(currentUser);
                return Unit.Value;
            }
        }
    }
}