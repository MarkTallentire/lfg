using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Domain.Classes;

namespace Application.Interfaces
{
    public interface IJwtGenerator
    {
        Task<string> GenerateToken(User user);
    }
}
