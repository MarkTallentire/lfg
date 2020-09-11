using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Interfaces;
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
        }

        public class RequestHandler : IRequestHandler<Request, int>
        {
            private readonly DataContext _context;
            private readonly IHttpUserAccessor _userAccessor;
            private readonly UserManager<User> _userManager;

            public RequestHandler(DataContext context, IHttpUserAccessor userAccessor, UserManager<User> userManager)
            {
                _context = context;
                _userAccessor = userAccessor;
                _userManager = userManager;
            }

            public async Task<int> Handle(Request request, CancellationToken cancellationToken)
            {
                var currentUserName = _userAccessor.GetCurrentUserName();
                if(currentUserName == null)
                    throw new AuthenticationException("you must be authenticated to create a new group");

                var currentUser = await _userManager.FindByNameAsync(currentUserName);
                if (currentUser == null)
                    throw new AuthenticationException("you must be authenticated to create a new group");


                var group = _context.Groups.SingleOrDefault(x => x.Name == request.GroupName);
                if(group != null)
                    throw new EntityAlreadyExistsException("group", "a group with this name already exists");

                group = new Group()
                {
                    Name = request.GroupName,
                    Description = request.Description,
                    PrivacyLevel = Enum.Parse<GroupPrivacyLevel>(request.PrivacyLevel, true)
                };

                group.Members.Add(new GroupMember()
                {
                    User = currentUser,
                    Group = group,
                    IsGroupLeader = true
                });
                _context.Groups.Add(group);

                await _context.SaveChangesAsync(cancellationToken);

                return group.Id;
            }
        }
    }
}
