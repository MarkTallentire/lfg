using System;
using System.Collections.Generic;
using System.Security.Authentication;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Data;
using Domain.Classes;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace Application.Auth
{
    public class CurrentUser
    {
        public class Request : IRequest<CurrentUserDTO>
        {

        }

        public class RequestHandler : IRequestHandler<Request, CurrentUserDTO>
        {
            private readonly UserManager<User> _userManager;
            private readonly IHttpUserAccessor _userAccessor;


            public RequestHandler(UserManager<User> userManager, IHttpUserAccessor userAccessor)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
            }

            public async Task<CurrentUserDTO> Handle(Request request, CancellationToken cancellationToken)
            {
                var userName = _userAccessor.GetCurrentUserName();

                if (string.IsNullOrWhiteSpace(userName))
                    throw new AuthenticationException("User isn't authenticated");

                var user = await _userManager.FindByNameAsync(userName);
                if (user == null)
                    throw new AuthenticationException("Unable to locate user");

                return new CurrentUserDTO()
                {
                    Username = user.UserName
                };



            }
        }
    }

    public class CurrentUserDTO
    {
        public string Username { get; set; }
    }
}
