using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Dtos.Reservation
{
    public class AddServiceDto
    {
        public string FullName { get; set; } = String.Empty;
        public string PlateNumber { get; set; } = String.Empty;
        public string CarMake { get; set; } = String.Empty;
        public string CarModel { get; set; } = String.Empty;
        public DateOnly Date { get; set; }
        public TimeOnly Hours { get; set; }
        public int WorkStation { get; set; }
        public int Estimate { get; set; }
        public string Description { get; set; } = String.Empty;
        public string? Notes { get; set; }
        public int UserId { get; set; }

    }
}
