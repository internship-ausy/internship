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
        private readonly IMapper _mapper;
       
            
        public AuthService(IAuthRepository authRepo, IMapper mapper)
        {
            _authRepo = authRepo ;
            _mapper = mapper ;
           
        }
        public ServiceResponse<IList<RegisterDto>> RegisterUsers(User user)
        {
            var response = new ServiceResponse<IList<RegisterDto>>();
            var users = _authRepo.Register().Result;
            //response.Data - users.Select(u => _mapper.Map<RegisterDto>(u)).ToList();

            return response;

          

           
        }

    }
}
