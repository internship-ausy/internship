using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;
       
            
        public AuthService(IAuthRepository authRepository, IMapper mapper, IConfiguration configuration)
        {
            _authRepository = authRepository ;
            _mapper = mapper ;
            _configuration = configuration;
        }
        public async Task<ServiceResponse<int>> RegisterUsers(RegisterDto newUser)
        {
            var response = new ServiceResponse<int>();

            if (await _authRepository.EmailExists(newUser.Email))
            {
                throw new HttpRequestException("Email already exists.");
            }
            if (await _authRepository.UserExists(newUser.Username))
            {
                throw new HttpRequestException("User already exists.");
            }

            var user = _mapper.Map<User>(newUser);
            await _authRepository.Register(user);

            response.Data = user.Id;
            response.Success = true;  
            response.Message = "Registration Successfully";

            return response;

          

           
        }
        public async Task<ServiceResponse<string>> Login(string username, string password)
        {
            var response = new ServiceResponse<string>();
            var user = (await _authRepository.Login())
            .FirstOrDefault(u => u.Username.ToLower().Equals(username.ToLower())
             && u.Password.ToLower().Equals(password.ToLower()));
            if (user == null)
            {
                throw new HttpRequestException("Incorrect username or password");
            }
            else
            {
                //response.Data = user.Id.ToString();
                response.Data = _authRepository.CreateToken(user);
                response.Message = "Authentification Succeeded";
            }
            return response;
        }

        public async Task<ServiceResponse<string>> PasswordRecovery(string email)
        {
            var response = new ServiceResponse<string>();
            if (!await _authRepository.EmailExists(email))
                throw new KeyNotFoundException("Email not found");

            var token = CreatePasswordResetToken(email);
            var passwordResetLink = "http://localhost:4200/change-password?token=" + token;

            SendEmail(email, passwordResetLink);
            
            response.Data = token;
            response.Message = "Email sent.";

            return response;
        }

        private string CreatePasswordResetToken(string email)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email)
            };

            var appSettingsToken = _configuration.GetSection("AppSettings:Token").Value;
            if (appSettingsToken is null)
                throw new Exception("AppSettings Token is null!");

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8
                .GetBytes(appSettingsToken));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(10),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private static void SendEmail(string mailTo, string mailBody)
        {
            try
            {
                var newMail = new MailMessage();

                newMail.From = new MailAddress("servicemanager@gmail.com");
                newMail.To.Add(mailTo);
                newMail.Subject = "Password Recovery";
                newMail.Body = mailBody;

                using var client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;
                client.Credentials = new System.Net.NetworkCredential("servicemanager1001@gmail.com", "rewmtovqymsrxdxw");
                client.Send(newMail);
            }
            catch (Exception)
            {
                throw new SmtpException("Email service error");
            }
        }
    }
}
