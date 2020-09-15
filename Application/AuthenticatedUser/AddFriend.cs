using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces.AuthenticatedUser;
using Application.Interfaces.Email;
using Domain.Classes;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.AuthenticatedUser
{
    public class AddFriend
    {
        public class Request : IRequest<Unit>
        {
            public string FriendId { get; set; }
        }


        public class IRequest : IRequestHandler<Request, Unit>
        {
            private readonly IAuthenticatedUserService _authenticatedUserService;
            private readonly UserManager<User> _userManager;
            private readonly ISmtpEmailSender _smtpEmailSender;

            public IRequest(IAuthenticatedUserService authenticatedUserService, UserManager<User> userManager,
                ISmtpEmailSender smtpEmailSender)
            {
                _authenticatedUserService = authenticatedUserService;
                _userManager = userManager;
                _smtpEmailSender = smtpEmailSender;
            }


            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var currentUser = await _authenticatedUserService.GetAuthenticatedUser();
                if (currentUser.AddFriend(request.FriendId))
                {
                    var friend = await _userManager.FindByIdAsync(request.FriendId);
                    _smtpEmailSender.SendEmail($"{currentUser.UserName} has sent you a friend request",
                        $"{currentUser.UserName} has sent you a friend request, login to accept or reject it",
                        friend.Email);
                    await _userManager.UpdateAsync(currentUser);
                }

                return Unit.Value;
            }
        }
    }


}