using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Dtos.Reservation
{
    public class LogsDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string PlateNumber { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public DateTime EndDate { get; set; }
        public int Estimate { get; set; }
        public int WorkStation { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
