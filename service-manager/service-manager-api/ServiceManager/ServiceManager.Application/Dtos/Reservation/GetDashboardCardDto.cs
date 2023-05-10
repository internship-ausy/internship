using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Dtos.Reservation
{
    public class GetDashboardCardDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public DateTime EndDate { get; set; }
        public string PlateNumber { get; set; } = String.Empty;
        public string FullName { get; set; } = String.Empty;
        public int WorkStation { get; set; }
        public int Estimate { get; set; }
    }
}
