using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Dtos.Reservation
{
    public class EditReservationDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = String.Empty;
        public string PlateNumber { get; set; } = String.Empty;
        public string CarMake { get; set; } = String.Empty;
        public string CarModel { get; set; } = String.Empty;
        public DateTime Date { get; set; }
        public int WorkStation { get; set; }
        public int Estimate { get; set; }
        public string Description { get; set; } = String.Empty;
        public string? Notes { get; set; }
    }
}
