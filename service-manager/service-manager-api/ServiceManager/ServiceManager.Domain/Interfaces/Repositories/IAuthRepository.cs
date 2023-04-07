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
        //Task<ServiceResponse<int>> Register(User user);
        Task<IList<User>> Register();
        //public Task<bool> UserExists(string username);
        //public Task<bool> EmailExists(string email);
    }
}

