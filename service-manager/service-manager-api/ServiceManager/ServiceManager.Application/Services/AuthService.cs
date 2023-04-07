using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }
        public  ServiceResponse<string> Login(string username, string password)
        {
            var response = new ServiceResponse<string>();
            var user = _authRepository.Login().Result
            .FirstOrDefault(u => u.Username.ToLower().Equals(username.ToLower())
             && u.Password.ToLower().Equals(password.ToLower()));
            if (user == null)
            {
                throw new HttpRequestException("Incorrect username or password");
            }
            else
            {
                response.Data = user.Id.ToString();
                response.Message = "Authentification Succeeded";
            }
            return response;
        }
    }
}
