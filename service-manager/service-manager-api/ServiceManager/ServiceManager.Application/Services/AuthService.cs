using AutoMapper;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ServiceManager.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;
       
            
        public AuthService(IAuthRepository authRepo, IMapper mapper)
        {
            _authRepository = _authRepository ;
            _mapper = mapper ;
           
        }
        public async Task<ServiceResponse<RegisterDto>> RegisterUsers(RegisterDto newUser)
        {
            var response = new ServiceResponse<RegisterDto>();

            if (await _authRepository.EmailExists(newUser.Email))
            {
                throw new HttpRequestException("Email already exists.");
            }
            if (await _authRepository.UserExists(newUser.Username))
            {
                throw new HttpRequestException("User already exists.");
            }

            var user = _mapper.Map<User>(newUser);
            await _authRepository.Register(user);

            response.Data = newUser;
            response.Success = true;    

            return response;

          

           
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
