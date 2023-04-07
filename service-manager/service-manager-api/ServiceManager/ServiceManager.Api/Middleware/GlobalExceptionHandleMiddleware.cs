using ServiceManager.Domain.Models;
using System.Net;

namespace ServiceManager.Api.Middleware
{
    public class GlobalExceptionHandleMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
			try
			{
				await next(context);
			}
			catch (Exception ex)
			{
				var error = new Error();

				switch (ex)
				{
					case KeyNotFoundException:
						error.StatucCode = ((int)HttpStatusCode.NotFound).ToString();
						error.Message = ex.Message;
						break;
					case UnauthorizedAccessException:
						error.StatucCode = ((int)HttpStatusCode.Unauthorized).ToString();
						error.Message = ex.Message;
						break;
					case HttpRequestException:
                        error.StatucCode = ((int)HttpStatusCode.NotFound).ToString();
                        error.Message = ex.Message;
                        break;

                    default:
						error.StatucCode = ((int)HttpStatusCode.InternalServerError).ToString();
						error.Message = ex.Message;
						break;
				}

				context.Response.ContentType = "application/json";
				context.Response.StatusCode = Int32.Parse(error.StatucCode);

				await context.Response.WriteAsync(error.ToString());
			}
        }
    }
}
