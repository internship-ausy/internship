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
       
            
        public AuthService(IAuthRepository authRepository, IMapper mapper)
        {
            _authRepository = authRepository ;
            _mapper = mapper ;
           
        }
        public async Task<ServiceResponse<int>> RegisterUsers(RegisterDto newUser)
        {
            var response = new ServiceResponse<int>();

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

            response.Data = user.Id;
            response.Success = true;  
            response.Message = "Registration Successfully";

            return response;

          

           
        }
        public async Task<ServiceResponse<string>> Login(string username, string password)
        {
            var response = new ServiceResponse<string>();
            var user = (await _authRepository.Login())
            .FirstOrDefault(u => u.Username.ToLower().Equals(username.ToLower())
             && u.Password.ToLower().Equals(password.ToLower()));
            if (user == null)
            {
                throw new HttpRequestException("Incorrect username or password");
            }
            else
            {
                //response.Data = user.Id.ToString();
                response.Data = _authRepository.CreateToken(user);
                response.Message = "Authentification Succeeded";
            }
            return response;
        }

    }
}
