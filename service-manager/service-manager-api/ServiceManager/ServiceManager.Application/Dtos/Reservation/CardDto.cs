using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Dtos.Reservation
{
    public class CardDto
    {
        public string? FullName { get; set; }
        public string? PlateNumber { get; set; }
        public DateTime Date { get; set; }
        public int WorkStation { get; set; }
        public int Estimate { get; set; }
    }
}
