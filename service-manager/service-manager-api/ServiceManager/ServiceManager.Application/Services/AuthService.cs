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

namespace ServiceManager.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepo;
       
            
        public AuthService(IAuthRepository authRepo)
        {
            _authRepo = authRepo ;
           
        }
        public ServiceResponse<IList<RegisterDto>> Register(RegisterDto user)
        {
            var response = new ServiceResponse<IList<RegisterDto>>();
            

            return response;

          

           
        }

    }
}
