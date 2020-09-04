using System.Threading.Tasks;
using Application.Auth;
using Data;
using MediatR;
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
        public async Task<string> Register(Register.Request request)
        {
            return await _mediator.Send(request);
        }
    }
}
