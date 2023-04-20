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
						error.StatusCode = ((int)HttpStatusCode.NotFound).ToString();
						error.Message = ex.Message;
						break;
					case UnauthorizedAccessException:
						error.StatusCode = ((int)HttpStatusCode.Unauthorized).ToString();
						error.Message = ex.Message;
						break;
					case HttpRequestException:
                        error.StatusCode = ((int)HttpStatusCode.Unauthorized).ToString();
                        error.Message = ex.Message;
                        break;

                    default:
						error.StatusCode = ((int)HttpStatusCode.InternalServerError).ToString();
						error.Message = ex.Message;
						break;
				}

				context.Response.ContentType = "application/json";
				context.Response.StatusCode = Int32.Parse(error.StatusCode);

                await context.Response.WriteAsync(error.ToString());
			}
        }
    }
}
