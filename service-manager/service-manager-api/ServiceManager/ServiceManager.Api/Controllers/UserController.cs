using Microsoft.AspNetCore.Mvc;
using ServiceManager.Api;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Models;

namespace ServiceManager.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        public UserController(IUserService service)
        {
            _service = service;
        }

        
        [HttpGet(Name = "GetUsers")]
        public ActionResult<ServiceResponse<List<GetUserDto>>> Get()
        {
            return Ok(_service.getAllUsers());
        }
        
    }
}


