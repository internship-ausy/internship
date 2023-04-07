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
        private readonly IAuthRepository _authRepo;
        private readonly IMapper _mapper;
       
            
        public AuthService(IAuthRepository authRepo, IMapper mapper)
        {
            _authRepo = authRepo ;
            _mapper = mapper ;
           
        }
        public async Task<ServiceResponse<RegisterDto>> RegisterUsers(RegisterDto newUser)
        {
            var response = new ServiceResponse<RegisterDto>();

            if (await _authRepo.EmailExists(newUser.Email))
            {
                throw new HttpRequestException("Email already exists.");
            }
            if (await _authRepo.UserExists(newUser.Username))
            {
                throw new HttpRequestException("User already exists.");
            }

            var user = _mapper.Map<User>(newUser);
            await _authRepo.Register(user);

            response.Data = newUser;
            response.Success = true;    

            return response;

          

           
        }

    }
}
//var response = new ServiceResponse<int>();
//    if (await EmailExists(user.Email))
//    {
//        response.Success = false;
//        response.Message = "Email already exists.";
//        return response;
//    }
//    if (await UserExists(user.Username))
//    {
//        response.Success = false;
//        response.Message = "User already exists.";
//        return response;
//    }