using System.Collections.Generic;
using System.Threading.Tasks;
using Application.AuthenticatedUser;
using Domain.Classes.Groups;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet("groups")]
        public async Task<List<UserGroupListDto>> GetUserGroups()
        {
            return await _mediator.Send(new GroupsList.Request());
        }

        [HttpPost("friends")]
        public async Task<Unit> AddFriend(AddFriend.Request request)
        {
            return await _mediator.Send(request);
        }

        [HttpDelete("friends/{id}")]
        public async Task<Unit> RemoveFriend(string id)
        {
            return await _mediator.Send(new RemoveFriend.Request()
            {
                FriendId = id
            });
        }

    }
}