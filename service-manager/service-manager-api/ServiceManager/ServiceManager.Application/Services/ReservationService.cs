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
                if (CalculateEndDate(res.Date, res.Estimate) > date)
                {
                    isReservationValid = false;
                    throw new Exception("A car is alredy on WS");

                }
            });
            
            reservationsAfterDate.ForEach(res =>
            {
                if (CalculateEndDate(date, estimate) > res.Date)
                {
                    isReservationValid = false;
                    throw new Exception("Reservation error after");

                }
            });
            
            return isReservationValid;
        }

        private static DateTime CalculateEndDate(DateTime startFullDate, int estimate)
        {
            TimeSpan workDayStart = new(8, 0, 0);
            TimeSpan workDayEnd = new(17, 0, 0);
            TimeSpan lunchBreakStart = new(12, 0, 0);
            TimeSpan lunchBreakEnd = new(13, 0, 0);
            TimeSpan lunchDuration = (lunchBreakEnd - lunchBreakStart);

            DateTime reservationEndDate = startFullDate.AddHours(estimate);

            if (reservationEndDate.TimeOfDay > lunchBreakStart)
            {
                reservationEndDate = reservationEndDate.Add(lunchDuration);
            }

            if (reservationEndDate.TimeOfDay > workDayEnd)
            {
                TimeSpan remainingTime = reservationEndDate.TimeOfDay - workDayEnd;

                DateTime nextDayStart = startFullDate.Date.AddDays(1).Add(workDayStart);

                if (reservationEndDate.Date == nextDayStart.Date && reservationEndDate.TimeOfDay > lunchBreakStart)
                {
                    reservationEndDate = nextDayStart.Add(reservationEndDate.TimeOfDay + (lunchDuration));
                }
                else
                {
                    reservationEndDate = nextDayStart.Add(remainingTime);

                    if (reservationEndDate.TimeOfDay > workDayEnd)
                    {
                        reservationEndDate = CalculateEndDate(nextDayStart, (int)remainingTime.TotalHours);
                    }
                }
            }

            return reservationEndDate;
        }
    }
}
