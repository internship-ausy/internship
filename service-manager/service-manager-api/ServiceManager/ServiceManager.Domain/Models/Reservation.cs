using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Domain.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PlateNumber { get; set; } = string.Empty;
        public string CarMake { get; set; } = string.Empty;
        public string CarModel { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public int WorkStation { get; set; }
        public int Estimate { get; set; }
        public string Description { get; set; } = string.Empty;
        public int UserId { get; set; }

    }
}
