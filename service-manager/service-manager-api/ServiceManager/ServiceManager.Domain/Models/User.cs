using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public byte[] PasswordHash { get; set; } = new byte[0];
        public byte[] PasswordSalt { get; set; } = new byte[0];
        public List<Reservation> Reservations { get; set; }
        
        public User() {
            Reservations = new List<Reservation>();
        }
    }
}
