using Microsoft.AspNetCore.Mvc;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;

namespace ServiceManager.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase

    {
        private readonly IAuthRepository _authRepo;
        public AuthController(IAuthRepository authRepo)
        {
            this._authRepo = authRepo;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(RegisterDto request)
        {
            var response = await _authRepo.Register(
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
