using Microsoft.EntityFrameworkCore;
using ServiceManager.Dal.DataContext;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Dal.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DatabaseContext _context;

        public AuthRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<User> Register(User newUser)
        {
            
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username.ToLower() == newUser.Username.ToLower());

            

            if ( user == null)
                {
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();
                //return user;
                }
            throw new Exception ("User not found");

        }
      

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(u => u.Username.ToLower() == username.ToLower()))
            {
                return true;
            }
            return false;
        }

        public async Task<bool> EmailExists(string email)
        {
            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }
    }
}
