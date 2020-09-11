using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Data;
using Domain.Classes.Groups;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.AuthenticatedUser
{
    public class GroupsList
    {
        public class Request : IRequest<List<UserGroupListDto>>
        {
            
        }

        public class RequestHandler : IRequestHandler<Request, List<UserGroupListDto>>
        {
            private readonly DataContext _context;
            private readonly IHttpUserAccessor _httpUserAccessor;
            private readonly UserManager<Domain.Classes.User> _userManager;

            public RequestHandler(DataContext context, IHttpUserAccessor httpUserAccessor, UserManager<Domain.Classes.User> userManager)
            {
                _context = context;
                _httpUserAccessor = httpUserAccessor;
                _userManager = userManager;
            }
            
            public async Task<List<UserGroupListDto>> Handle(Request request, CancellationToken cancellationToken)
            {
                var username = _httpUserAccessor.GetCurrentUserName();
                if(username == null)
                    throw new AuthenticationException("cannot list groups for unauthenticated member");
                var user = await _userManager.FindByNameAsync(username);
                if (user == null)
                    throw new AuthenticationException("cannot list groups for unauthenticated member");
                
                var groups = await _context.Groups
                                            .Where(x => x.Members.Select(x => x.UserId)
                                                .Contains(user.Id))
                                            .Select(x=> new UserGroupListDto()
                                            {
                                                GroupName = x.Name,
                                                Description =  x.Description,
                                                MemberIds = x.Members.Select(x=>x.UserId).ToList(),
                                                PrivacyLevel = x.PrivacyLevel
                                            })
                                            .ToListAsync(cancellationToken: cancellationToken);

                return groups;
                
            }
        }
        
        
    }
}