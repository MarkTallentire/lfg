using System.Threading.Tasks;
using Application;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupFinderController
    {
        private readonly IMediator _mediator;

        public GroupFinderController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpPost("users")]
        public async Task<Unit> AddToQueue(JoinGroupFinder.Request request)
        {
            return await _mediator.Send(request);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<Unit> Test()
        {
            return await _mediator.Send(new FindGroups.Request());
        }
        
    }
}