using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ServiceManager.Domain.Interfaces.Services
{
    public interface IUserService
    {
        List<User> getAllUsers();

    }
}
