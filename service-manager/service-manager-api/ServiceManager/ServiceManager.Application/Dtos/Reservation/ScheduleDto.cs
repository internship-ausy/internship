using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Dtos.Reservation
{
    public class ScheduleDto
    {
        public string? PlateNumber { get; set; }
        public DateTime Date { get; set; }
        public int WorkStation { get; set; }
    }
}
