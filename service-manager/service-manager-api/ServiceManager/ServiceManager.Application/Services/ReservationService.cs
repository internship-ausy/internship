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

            if (!await ValidateReservation(
                newReservation.WorkStation,
                newReservation.Estimate,
                newReservation.Date
                )) 
                    throw new Exception("Reservation not valid");

            newReservation.UserId = 24;
            var reservation = _mapper.Map<Reservation>(newReservation);
            await _reservationRepository.AddReservation(reservation);

            response.Data = reservation.Id;
            response.Success = true;
            response.Message = "Reservation Successfully";

            return response;
        }

        private async Task<bool> ValidateReservation(int workStation, int estimate, DateTime date)
        {
            var businessStartingHours = new TimeOnly(8, 0);
            var businessEndingHours = new TimeOnly(17, 0);

            var isReservationValid = true;
            var reservationsByWorkStation = await _reservationRepository.GetReservationsByWorkStation(workStation);
            var reservationsBeforeDate = reservationsByWorkStation.Where(r => r.Date <= date).ToList();
            var reservationsAfterDate = reservationsByWorkStation.Where(r => r.Date > date).ToList();
            
            reservationsBeforeDate.ForEach(res =>
            {
                if (res.Date.AddHours(res.Estimate) > date)
                {
                    isReservationValid = false;
                    throw new Exception("A car is alredy on WS" + businessStartingHours + businessEndingHours);

                }
            });
            
            reservationsAfterDate.ForEach(res =>
            {
                if (date.AddHours(estimate) > res.Date)
                {
                    isReservationValid = false;
                    throw new Exception("Reservation error after");

                }
            });
            
            return isReservationValid;
        }
    }
}
