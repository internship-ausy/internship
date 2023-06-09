﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Dtos.Reservation
{
    public class TooltipDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PlateNumber { get; set; }
        public string? CarMake { get; set; }
        public string? CarModel { get; set; }
        public DateTime Date { get; set; }
        public int WorkStation { get; set; }
        public int Estimate { get; set; }
        public string? Description { get; set; }
    }
}
