using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces.AuthenticatedUser;
using Data;
using Domain.Classes.GroupFinder;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application
{
    public class JoinGroupFinder
    {
        public class Request : IRequest<Unit>
        {
            public QueueType QueueType { get; set; }
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
            
            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var user = await _authenticatedUserService.GetAuthenticatedUser();
                var queue = await _context
                                            .GroupFinder
                                            .SingleOrDefaultAsync(x => x.QueueType == request.QueueType, 
                                                                    cancellationToken: cancellationToken);
                
                queue.AddToQueue(user);
                await _context.SaveChangesAsync(cancellationToken);
                
                return Unit.Value;
            }
        }
    }
}