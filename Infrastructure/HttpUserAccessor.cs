using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure
{
    public class HttpUserAccessor : IHttpUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpUserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetCurrentUserName()
        {
            return _httpContextAccessor?.HttpContext?.User?.Identity?.Name;
        }
    }
}
