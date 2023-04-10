﻿using Microsoft.AspNetCore.Mvc;
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
            private readonly IAuthService _authService;
            public AuthController(IAuthService authService)
            {
            _authService = authService;
            }

            [HttpPost("login")]
            public async Task<ActionResult<ServiceResponse<int>>> Login(LoginDto request)
            {
                var response = await _authService.Login(request.Username, request.Password);
                if (!response.Success)
                {
                    return BadRequest(response);
                }
                return Ok(response);
            }
            [HttpPost("Register")]
        public async Task<ActionResult<ServiceResponse<int>>> Register(RegisterDto newUser)
        {
            var response = await _authService.RegisterUsers(newUser);

            
            if(!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
        }
 }
