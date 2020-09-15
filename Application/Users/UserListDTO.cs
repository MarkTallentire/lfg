using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users
{
    public class UserListDTO
    {
        public string Id { get; set; }
        public string Username { get; set; }
    }
}