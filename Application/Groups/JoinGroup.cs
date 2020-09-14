using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces.AuthenticatedUser;
using Data;
using Domain.Classes;
using Domain.Classes.Groups;
using Domain.Exceptions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Groups
{
    public class JoinGroup
    {
        public class Request : IRequest<Unit>
        {
            public int GroupId { get; set; }
        }


        public class RequestHandler : IRequestHandler<Request, Unit>
        {
            private readonly DataContext _context;
            private readonly IAuthenticatedUserService _authenticatedUserService;
            private readonly ILogger _logger;


            public RequestHandler(DataContext context, IAuthenticatedUserService authenticatedUserService, ILogger<JoinGroup> logger)
            {
                _context = context;
                _authenticatedUserService = authenticatedUserService;
                _logger = logger;
            }
            
            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var currentUser = await _authenticatedUserService.GetAuthenticatedUser();
                var group = await _context.Groups.Where(x => x.Id == request.GroupId).SingleOrDefaultAsync(cancellationToken: cancellationToken);
                
                if(group == null)
                    throw new JoinGroupException("unable to join group as it doesn't exist");
                
                group.JoinGroup(currentUser);

                if (await _context.SaveChangesAsync(cancellationToken) <= 0)
                {
                    _logger.LogCritical($"Failed to join group for {currentUser.Id} and group {group.Id}");
                    throw new JoinGroupException("something went wrong, looks like this group might be setup incorrectly, we've logged the issue and will fix it asap");
                }

                return Unit.Value;
            }
        }
    }
}