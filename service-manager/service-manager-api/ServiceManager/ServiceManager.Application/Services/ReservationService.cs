using AutoMapper;
using Microsoft.AspNetCore.Http;
using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System.Security.Claims;

namespace ServiceManager.Application.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ReservationService
            (
                IReservationRepository reservationRepository, 
                IMapper mapper,
                IHttpContextAccessor httpContextAccessor
            )
        {
            _reservationRepository = reservationRepository;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }
        public async Task<ServiceResponse<int>> AddReservation(AddServiceDto newReservation)
        {
            var response = new ServiceResponse<int>();

            if (!await ValidateReservation(
                newReservation.WorkStation,
                newReservation.Estimate,
                newReservation.Date
                )) 
                    throw new HttpRequestException("Reservation not valid");

            newReservation.UserId = GetUserId();
            var reservation = _mapper.Map<Reservation>(newReservation);
            await _reservationRepository.AddReservation(reservation);

            response.Data = reservation.Id;
            response.Success = true;
            response.Message = "Reservation Added";

            return response;
        }

        private async Task<bool> ValidateReservation(int workStation, int estimate, DateTime date)
        {
            var isReservationValid = true;
            var reservationsByWorkStation = await _reservationRepository.GetReservationsByWorkStation(workStation);
            var reservationsBeforeDate = reservationsByWorkStation.Where(r => r.Date <= date).ToList();
            var reservationsAfterDate = reservationsByWorkStation.Where(r => r.Date > date).ToList();
            
            reservationsBeforeDate.ForEach(res =>
            {
                if (CalculateEndDate(res.Date, res.Estimate) > date)
                {
                    isReservationValid = false;
                }
            });
            
            reservationsAfterDate.ForEach(res =>
            {
                if (CalculateEndDate(date, estimate) > res.Date)
                {
                    isReservationValid = false;
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

            if (reservationEndDate.TimeOfDay > lunchBreakStart && startFullDate.TimeOfDay < lunchBreakStart)
            {
                reservationEndDate = reservationEndDate.Add(lunchDuration);
            }

            if (reservationEndDate.TimeOfDay > workDayEnd)
            {
                TimeSpan remainingTime = reservationEndDate.TimeOfDay - workDayEnd;

                DateTime nextDayStart = startFullDate.Date.AddDays(1).Add(workDayStart);

                if 
                (
                    reservationEndDate.Date == nextDayStart.Date && 
                    reservationEndDate.TimeOfDay > lunchBreakStart && 
                    startFullDate.TimeOfDay < lunchBreakStart
                )
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

        private int GetUserId() => int.Parse(_httpContextAccessor.HttpContext!.User
            .FindFirstValue(ClaimTypes.NameIdentifier)!);
            
        public async Task<ServiceResponse<List<GetDashboardCardDto>>> GetDashboardCards()
        {
            var serviceResponse = new ServiceResponse<List<GetDashboardCardDto>>();
            var dashboardCards = await _reservationRepository.GetDashboardCards();
            serviceResponse.Data = dashboardCards.Select(d => _mapper.Map<GetDashboardCardDto>(d)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetReservationDto>>> EditService(EditServiceDto editedReservation)
        {
            if (!await ValidateReservation(
                editedReservation.WorkStation,
                editedReservation.Estimate,
                editedReservation.Date
                ))
                throw new HttpRequestException("Reservation not valid");
            var response = new ServiceResponse<List<GetReservationDto>>();
            var reservation = _mapper.Map<Reservation>(editedReservation);
            var edit = await _reservationRepository.EditReservations(reservation);
            if (edit == null)
            {
                throw new KeyNotFoundException("Reservation not found");
            }
            response.Data = edit.Select(r => _mapper.Map<GetReservationDto>(r)).ToList();
            response.Success = true;
            return response;
        }
        public async Task<ServiceResponse<List<GetReservationDto>>> DeleteReservation(int id)
        {
            var serviceResponse = new ServiceResponse<List<GetReservationDto>>();
            var reservations = await _reservationRepository.DeleteReservation(id);
            serviceResponse.Data = reservations.Select(r => _mapper.Map<GetReservationDto>(r)).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetReservationDto>> getReservationByID(int reservationID)
        {
            var response = new ServiceResponse<GetReservationDto>();
            var reservation = await _reservationRepository.GetReservationsByID(reservationID);
            response.Data = _mapper.Map<GetReservationDto>(reservation);
            return response;
        }
    }
}