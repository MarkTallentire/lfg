using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Data;
using Domain.Classes;
using Domain.Classes.GroupFinder;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application
{
    public class FindGroups
    {
        public class Request : IRequest<Unit>
        {
            
        }


        public class RequestHandler : IRequestHandler<Request, Unit>
        {
            private readonly DataContext _context;

            public RequestHandler(DataContext context)
            {
                _context = context;
            }
            
            public async Task<Unit> Handle(Request request, CancellationToken cancellationToken)
            {
                var queues = await _context.GroupFinder.Include(x => x.Queue)
                    .ToListAsync(cancellationToken: cancellationToken);

                foreach (var queue in queues)
                {
                    if (queue.QueueType == QueueType.Online)
                        FindOnlineGroups(queue);
                    else if (queue.QueueType == QueueType.InPerson)
                        Debug.WriteLine(string.Join(",",FindInPersonGroups(queue)));
                }

                return Unit.Value;
            }

            private void FindOnlineGroups(GroupFinder queue)
            {
                //Any actively looking for the same games?
                //Any at the right skill levels?
                //Any of these available the same time we are?

                //Matchy match
         
            }

            private List<User> FindInPersonGroups(GroupFinder queue)
            {
                
                foreach (var user in queue.Queue)
                {
                    //Find people within the users willing to travel radius
                    var nearMe = queue
                                                .Queue
                                                .Where(x => x.Location.Distance(user.Location) <= 15 * 1069).ToList();

                    return nearMe;

                    Debug.Print(string.Join(',', nearMe));
                    
                    //Any actively looking for the same games?
                    //Any at the right skill levels?
                    //Any groups already exist for any of our games?
                    ////Yes - join existing group
                    /// No Continue
                    
                    //Any of these available the same time we are?
                    
                    
                    //Matchy match
                    
                }

                return null;
            }
        }
    }
}