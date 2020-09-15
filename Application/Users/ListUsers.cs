using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users
{
    public class ListUsers
    {
        public class Request : IRequest<List<UserListDTO>>
        {
        }


        public class RequestHandler : IRequestHandler<Request, List<UserListDTO>>
        {
            private readonly DataContext _context;

            public RequestHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<UserListDTO>> Handle(Request request, CancellationToken cancellationToken)
            {
                var users = await _context.Users
                    .Select(x => new UserListDTO
                    {
                        Id = x.Id,
                        Username = x.UserName
                    }).ToListAsync(cancellationToken: cancellationToken);

                return users;
            }
        }
    }
}