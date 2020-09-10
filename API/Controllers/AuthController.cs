using System.Diagnostics.Eventing.Reader;
using System.Threading.Tasks;
using Application.Auth;
using Data;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMediator _mediator;

        public AuthController(DataContext context, IMediator mediator)
        {
            _context = context;
            _mediator = mediator;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<string> Register(Register.Request request)
        {
            return await _mediator.Send(request);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<string> Login(Login.Request request)
        {
            return await _mediator.Send(request);
        }

        [HttpGet]
        public async Task<ActionResult<CurrentUserDTO>> GetCurrentUser()
        {
            return await _mediator.Send(new CurrentUser.Request());
        }


    }
}
