using Microsoft.AspNetCore.Mvc;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;

namespace ServiceManager.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase

    {
        private readonly IAuthService _service;
        public AuthController(IAuthService service)
        {
            _service = service;
        }

        [HttpPost("Register")]
        public ActionResult<ServiceResponse<List<RegisterDto>>> Register(RegisterDto request)
        {
            var response = _service.RegisterUsers(
                new User 
                { 
                    FullName = request.FullName, 
                    Username = request.Username, 
                    Email = request.Email,
                    Password = request.Password,
                }
                );
            if(!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
