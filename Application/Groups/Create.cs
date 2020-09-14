using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
using Application.Interfaces.AuthenticatedUser;
using Data;
using Domain.Classes;
using Domain.Classes.Groups;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Groups
{
    public class Create
    {
        public class Request : IRequest<int>
        {
            public string GroupName { get; set; }
            public string Description { get; set; }
            public string PrivacyLevel { get; set; }

            public int MinPlayers { get; set; }
            public int MaxPlayers { get; set; }
        }

        public class RequestHandler : IRequestHandler<Request, int>
        {
            private readonly DataContext _context;
            private readonly IAuthenticatedUserService _authenticatedUserService;

            public RequestHandler(DataContext context, IAuthenticatedUserService authenticatedUserService)
            {
                _context = context;
                _authenticatedUserService = authenticatedUserService;
            }

            public async Task<int> Handle(Request request, CancellationToken cancellationToken)
            {
                var currentUser = await _authenticatedUserService.GetAuthenticatedUser();

                var group = _context.Groups.SingleOrDefault(x => x.Name == request.GroupName);
                if(group != null)
                    throw new EntityAlreadyExistsException("group", "a group with this name already exists");

                group = new Group(request.GroupName, request.Description,
                       Enum.Parse<GroupPrivacyLevel>(request.PrivacyLevel, true), 
                                 currentUser, request.MinPlayers, request.MaxPlayers);
                
                _context.Groups.Add(group);

                await _context.SaveChangesAsync(cancellationToken);

                return group.Id;
            }
        }
    }
}
