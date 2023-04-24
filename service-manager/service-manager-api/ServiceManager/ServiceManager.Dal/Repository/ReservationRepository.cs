using Microsoft.EntityFrameworkCore;
using ServiceManager.Dal.DataContext;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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


    }
}
