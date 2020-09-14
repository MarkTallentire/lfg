using System.Threading;
using System.Threading.Tasks;
using Data;
using Domain.Classes.Groups;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Application.Groups
{
    public class RandomGroupName
    {
        public class Request : IRequest<string>
        {

        }

        public class RequestHandler : IRequestHandler<Request, string>
        {
            private readonly DataContext _context;

            public RequestHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<string> Handle(Request request, CancellationToken cancellationToken)
            {
                bool nameTaken;
                string randomName = "";
                int numberOfAttempts = 0;

                do
                {
                    randomName = Group.GenerateRandomName();
                    nameTaken = await _context.Groups.AnyAsync(x => x.Name == randomName, cancellationToken: cancellationToken);
                    numberOfAttempts++;

                    if (numberOfAttempts > 10)
                        return "Looks like we might have run out of unique combinations, you're on your own for now :(";

                } while (nameTaken);

                return randomName;
            }
        }
    }
}
