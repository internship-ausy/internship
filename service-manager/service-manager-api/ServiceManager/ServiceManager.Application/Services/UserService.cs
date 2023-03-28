using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using ServiceManager.Application.Interfaces;
using ServiceManager.Application.Dtos.User;
using AutoMapper;

namespace ServiceManager.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public ServiceResponse<IList<GetUserDto>> getAllUsers()
        {
            var response = new ServiceResponse<IList<GetUserDto>>();
            var users = _repo.getUsers().Result;
            response.Data = users.Select(u => _mapper.Map<GetUserDto>(u)).ToList();
            return response;
        }
    } 
}

