using System;
using System.Collections.Generic;
using System.Security.Authentication;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain.Classes;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Auth
{
    public class Login
    {
        public class Request : IRequest<string>
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        public class RequestHandler : IRequestHandler<Request, string>
        {
            private readonly UserManager<User> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public RequestHandler(UserManager<User> userManager, IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }
            public async Task<string> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(request.Username);

                if(user == null)
                    throw new AuthenticationException("Login failed");

                var password = await _userManager.CheckPasswordAsync(user, request.Password);

                if(!password)
                    throw new AuthenticationException("Login failed");


                return await _jwtGenerator.GenerateToken(user);

            }
        }
    }
}
