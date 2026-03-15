using System.Net;
using System.Text.Json;
using WorkItemTracker.Application.Exceptions;

namespace WorkItemTracker.API.Middleware
    {
    public class ExceptionMiddleware
        {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next) => _next = next;

        public async Task InvokeAsync(HttpContext context)
            {
            try
                {
                await _next(context);
                }
            catch (Exception ex)
                {
                context.Response.ContentType = "application/json";
                var status = ex switch
                    {
                        WorkItemNotFoundException => HttpStatusCode.NotFound,
                        InvalidWorkStatusException => HttpStatusCode.BadRequest,
                        ArgumentException => HttpStatusCode.BadRequest,
                        _ => HttpStatusCode.InternalServerError
                        };
                context.Response.StatusCode = (int)status;
                var result = JsonSerializer.Serialize(new { error = ex.Message });
                await context.Response.WriteAsync(result);
                }
            }
        }
    }