using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Dal.Repository
{
    public class UserRepository : IUserRepository
    {

        public List<User> getUsers()
        {
            var user1 = new User();
            var user2 = new User();
            user1.FullName = "tibi";
            user1.Username = "tibi";
            user1.Email = "tibi@gmail.com";
            user1.Password = "tibi";

            user2.FullName = "vali";
            user2.Username = "vali";
            user2.Email = "vali@gmail.com";
            user2.Password = "vali";
            return new List<User>()
            {
                user1, user2
            };
        }
    }
}
