using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceManager.Domain.Interfaces.Repositories
{
    public interface IReservationRepository
    {
        Task<int> AddReservation(Reservation newReservation);

    }
}
