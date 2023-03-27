using Microsoft.AspNetCore.Mvc;
using ServiceManager.Api;
using ServiceManager.Domain.Interfaces.Services;
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
        public IList<User> Get()
        {
            return _service.getAllUsers();
        }

    }
}


