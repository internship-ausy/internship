using Microsoft.AspNetCore.Mvc;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Models;

namespace ServiceManager.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<int>>> Login(LoginDto request)
        {
            var response = await _authService.Login(request.Username!, request.Password!);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(RegisterDto newUser)
        {
            var response = await _authService.RegisterUsers(newUser, newUser.Password);


            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("PasswordRecovery")]
        public async Task<ActionResult<ServiceResponse<string>>> PasswordRecovery(PasswordRecoveryDto email)
        {
            var response = await _authService.PasswordRecovery(email.Email!);


            if(!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);


        }

        [HttpPut("ChangePassword")]
        public async Task<ActionResult<ServiceResponse<string>>> ChangePassword(ChangePasswordDto payload)
        {
            var response = await _authService.ChangePassword(payload.Token!, payload.Password!);

            if (!response.Success)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
 }
