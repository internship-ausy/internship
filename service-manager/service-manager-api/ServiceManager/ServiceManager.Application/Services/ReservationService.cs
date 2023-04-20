using AutoMapper;
using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System.Security.Cryptography.X509Certificates;

namespace ServiceManager.Application.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IMapper _mapper;

        public ReservationService(IReservationRepository reservationRepository, IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _mapper = mapper;
        }
        public async Task<ServiceResponse<int>> AddReservation(AddServiceDto newReservation)
        {
            var response = new ServiceResponse<int>();

            

            newReservation.UserId = 36;
            var reservation = _mapper.Map<Reservation>(newReservation);
            await _reservationRepository.AddReservation(reservation);

            response.Data = reservation.Id;
            response.Success = true;
            response.Message = "Reservation Successfully";

            return response;
        }

        private async Task<bool> ValidateReservation(int workStation, int estimate, DateTime date, DateTime hours)
        {
            var isReservationValid = true;
            var reservationsByWorkStation = await _reservationRepository.GetReservationsByWorkStation(workStation);
            var reservationsBeforeDate = reservationsByWorkStation.Where(r => r.Date < date).ToList();
            var reservationsAfterDate = reservationsByWorkStation.Where(r => r.Date > date).ToList();
            
            reservationsBeforeDate.ForEach(res =>
            {
                if (res.Date.AddHours(res.Estimate) > date)
                    isReservationValid = false;
            });
            
            reservationsAfterDate.ForEach(res =>
            {
                if (date.AddHours(estimate) > res.Date)
                    isReservationValid = false;
            });
            
            return isReservationValid;
        }
    }
}
