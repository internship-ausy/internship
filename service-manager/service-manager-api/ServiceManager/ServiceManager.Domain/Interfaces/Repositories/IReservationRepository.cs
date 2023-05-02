using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Domain.Interfaces.Repositories
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetDashboardCards();
        Task<int> AddReservation(Reservation newReservation);
        Task<List<Reservation>> GetReservationsByWorkStation(int workStation, int id = 0);
        Task<List<Reservation>> DeleteReservation(int id);
        public Task<Reservation> EditReservations(Reservation editedReservation);
        public Task<bool> ReservationExists(int id);
        public int GetUserId(ClaimsPrincipal user);
        public Task<Reservation> GetReservationsByID(int reservationID);
    }
}
