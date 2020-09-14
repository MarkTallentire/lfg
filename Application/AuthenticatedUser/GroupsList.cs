using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Interfaces.AuthenticatedUser;
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
            private readonly IAuthenticatedUserService _authenticatedUserService;


            public RequestHandler(DataContext context, IAuthenticatedUserService authenticatedUserService)
            {
                _context = context;
                _authenticatedUserService = authenticatedUserService;

            }
            
            public async Task<List<UserGroupListDto>> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await _authenticatedUserService.GetAuthenticatedUser();
                
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