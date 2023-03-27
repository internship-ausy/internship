using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Interfaces.Services;
using ServiceManager.Domain.Models;

namespace ServiceManager.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

        public List<User> getAllUsers()
        {
            var allUsers = _repo.getUsers();
            return allUsers;
        }
    } 
}

