using Microsoft.EntityFrameworkCore;
using ServiceManager.Dal.DataContext;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection.Metadata;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;



namespace ServiceManager.Dal.Repository
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly DatabaseContext _context;

        public ReservationRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<Reservation>> GetDashboardCards()
        {
            return await _context.Reservations.ToListAsync();
        }


        public async Task<int> AddReservation(Reservation newReservation)
        {
            _context.Reservations.Add(newReservation);
            await _context.SaveChangesAsync();
            return newReservation.Id;
        }

        public async Task<List<Reservation>> GetReservationsByWorkStation(int workStation)
        {
            return await _context.Reservations.Where(r => r.WorkStation == workStation).ToListAsync();
        }

        public async Task<List<Reservation>> DeleteReservation(int id)
        {
            var reservation = await _context.Reservations
                .FirstOrDefaultAsync(c => c.Id == id) ?? throw new Exception($"Reservation with Id '{id}' not found");
            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return await _context.Reservations.ToListAsync();
        }

        public int GetUserId(ClaimsPrincipal user) => int.Parse(user.FindFirstValue(ClaimTypes.NameIdentifier));
        
        public async Task<List<Reservation>> GetReservationsByUser(int userID)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userID);
            return user.Reservations;
        }


        public async Task<List<Reservation>> EditReservations(Reservation editedReservation)
        {
            var reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == editedReservation.Id);
            if (reservation == null)
            {
                throw new KeyNotFoundException("Reservation not found");
            }
            reservation.FirstName = editedReservation.FirstName;
            reservation.LastName = editedReservation.LastName;
            reservation.Description = editedReservation.Description;
            reservation.CarMake = editedReservation.CarMake;
            reservation.CarModel = editedReservation.CarModel;
            reservation.Date = editedReservation.Date;
            reservation.WorkStation = editedReservation.WorkStation;
            reservation.Estimate = editedReservation.Estimate;
            reservation.Description = editedReservation.Description;
            await _context.SaveChangesAsync();
            return await _context.Reservations.ToListAsync();
        }

        public async Task<bool> ReservationExists(int id)
        {
            if (await _context.Reservations.AnyAsync(r => r.Id == id))
            {
                return true;
            }
            return false;
        }
    }
}
