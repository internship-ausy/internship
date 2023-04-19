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
        Task<User> ChangePassword(string email, byte[] passwordSalt, byte[] passwordHash);

        public Task<bool> UserExists(string username);
        public Task<bool> EmailExists(string email);
        public Task<User> GetUserByEmail(string email);

    }
}

