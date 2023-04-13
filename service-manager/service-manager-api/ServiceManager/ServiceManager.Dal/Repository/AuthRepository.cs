﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServiceManager.Dal.DataContext;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;

namespace ServiceManager.Dal.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DatabaseContext _context;

        private readonly IConfiguration _configuration;

        public AuthRepository(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<int> Register(User newUser)
        {
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return newUser.Id;
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

        public async Task<List<User>> Login()
        {
            return await _context.Users.ToListAsync();
        }

     

    }
}
