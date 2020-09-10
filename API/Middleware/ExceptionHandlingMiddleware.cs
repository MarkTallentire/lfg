using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Security.Authentication;
using System.Threading.Tasks;
using API.Middleware;
using Application.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace API.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch(Exception e)
            {
                await HandleExceptionAsync(httpContext, e);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            string result = null;
            context.Response.ContentType = "application/json";
            if (exception is EntityAlreadyExistsException)
            {
                var e = (EntityAlreadyExistsException)exception;
                context.Response.StatusCode = (int)HttpStatusCode.Conflict;
                result = JsonConvert.SerializeObject(new
                    {statusCode = context.Response.StatusCode, serverError = e.Message});
;            }
            else if (exception is AuthenticationException)
            {
                var e = (AuthenticationException) exception;
                context.Response.StatusCode = (int) HttpStatusCode.BadRequest;
                result = JsonConvert.SerializeObject(new
                    {statusCode = context.Response.StatusCode, serverError = e.Message});
            }

            return context.Response.WriteAsync(result);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ExceptionHandlingMiddlewareExtensions
    {
        public static IApplicationBuilder UseExceptionHandlingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandlingMiddleware>();
        }
    }
}
