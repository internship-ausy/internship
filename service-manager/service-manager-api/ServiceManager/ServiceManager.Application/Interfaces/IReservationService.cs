using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Dtos.User;
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
        Task<ServiceResponse<List<GetDashboardCardDto>>> GetDashboardCards();
        Task<ServiceResponse<int>> AddReservation(AddServiceDto newReservation);
        Task<ServiceResponse<List<GetReservationDto>>> EditService(EditServiceDto editedReservation);
    }
}
