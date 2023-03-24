using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Dtos.User
{
    public class ChangePasswordDto
    {
        public string? Password { get; set; }
        public string? PasswordConfirmation { get; set; }
    }
}
