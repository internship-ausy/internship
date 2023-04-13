using ServiceManager.Application.Dtos.User;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Interfaces
{
    public interface IAuthService
    {
        Task<ServiceResponse<int>> RegisterUsers(RegisterDto newUser, string password);
        public Task<ServiceResponse<string>> Login(string username, string password);
        Task<ServiceResponse<string>> PasswordRecovery(string email);
    }
}
