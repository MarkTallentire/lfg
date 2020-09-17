using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces.AuthenticatedUser;
using Data;
using MediatR;

namespace Application
{
    public class GroupFinder
    {
        public class Request : IRequest<Unit>
        {
            
        }


        public class RequestHandler : IRequestHandler<Request, Unit>
        {
            private readonly DataContext _context;
            private readonly IAuthenticatedUserService _authenticatedUserService;

            public RequestHandler(DataContext context, IAuthenticatedUserService authenticatedUserService)
            {
                _context = context;
                _authenticatedUserService = authenticatedUserService;
            }
            
            public Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            { 
                
            }
        }
    }
}