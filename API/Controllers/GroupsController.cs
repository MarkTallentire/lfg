using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Groups;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public GroupsController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        public async Task<int> CreateGroup(Create.Request request)
        {
            return await _mediator.Send(request);
        }

        [HttpGet("randomname")]
        public async Task<string> GetRandomName()
        {
            return await _mediator.Send(new RandomGroupName.Request());

        }
    }
}
