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
        public async Task<ActionResult<ServiceResponse<RegisterDto>>> Register(RegisterDto newUser)
        {
            var response = await _service.RegisterUsers(newUser);

            
            if(!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
