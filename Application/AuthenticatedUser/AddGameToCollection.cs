using System.Threading;
using System.Threading.Tasks;
using Application.Auth;
using Application.Interfaces.AuthenticatedUser;
using Data;
using Domain.Classes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.AuthenticatedUser
{
    public class AddGameToCollection
    {
        public class Request : IRequest<Unit>
        {
            public int GameId { get; set; }
            public UserSkillLevel SkillLevel { get; set; }
            public UserSkillLevel WillingToPlayWith { get; set; }
            public bool OwnsAllComponents { get; set; }
            public bool GameMaster { get; set; }
            public bool ActivelyLooking { get; set; }
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
                user.AddGameToCollection(request.GameId, request.SkillLevel, request.WillingToPlayWith,
                    request.OwnsAllComponents, request.GameMaster, request.ActivelyLooking);

                await _context.SaveChangesAsync(cancellationToken);
                return Unit.Value;
            }
        }
    }
}