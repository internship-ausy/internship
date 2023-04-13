using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Domain.Interfaces.Repositories
{
    public interface IAuthRepository
    {
        Task<int> Register(User newUser);
        public Task<List<User>> Login();
        public Task<User> ChangePassword(string token, string password);

        public Task<bool> UserExists(string username);
        public Task<bool> EmailExists(string email);

        public string CreateToken(User user);
    }
}

