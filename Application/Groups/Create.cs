using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Data;
using Domain.Classes;
using MediatR;

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

            public RequestHandler(DataContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(Request request, CancellationToken cancellationToken)
            {
                var group = _context.Groups.SingleOrDefault(x => x.Name == request.GroupName);

                if(group != null)
                    throw new EntityAlreadyExistsException("group", "a group with this name already exists");

                group = new Group()
                {
                    Name = request.GroupName,
                    Description = request.Description,
                    PrivacyLevel = Enum.Parse<GroupPrivacyLevel>(request.PrivacyLevel, true)
                };
                _context.Groups.Add(group);

                await _context.SaveChangesAsync(cancellationToken);

                return group.Id;
            }
        }
    }
}
