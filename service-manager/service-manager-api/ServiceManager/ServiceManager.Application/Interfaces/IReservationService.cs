using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Application.Interfaces
{
    public interface IReservationService
    {
        public Task<ServiceResponse<EditServiceDto>> EditService(EditServiceDto editedService);
    }
}
