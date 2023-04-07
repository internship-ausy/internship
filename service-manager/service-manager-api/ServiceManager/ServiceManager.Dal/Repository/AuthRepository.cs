using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ServiceManager.Dal.DataContext;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;

namespace ServiceManager.Dal.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DatabaseContext _context;

        public AuthRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<User>> Login()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
