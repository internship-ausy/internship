using AutoMapper;
using Microsoft.AspNetCore.Http;
using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;
using System.Drawing;
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

        private async Task<bool> ValidateReservation(int workStation, int estimate, DateTime date, int id = 0)
        {
            var isReservationValid = true;
            var reservationsByWorkStation = await _reservationRepository.GetReservationsByWorkStation(workStation, id);
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
            var todayStartHours = startFullDate.Date + workDayStart;
            var todayEndHours = startFullDate.Date + workDayEnd;
            var reservationEndDate = startFullDate.AddHours(estimate);

            var launchBreakStart = new DateTime(startFullDate.Year, startFullDate.Month, startFullDate.Day, 12, 0, 0);
            var launchBreakEnd = new DateTime(startFullDate.Year, startFullDate.Month, startFullDate.Day, 13, 0, 0);
            var launchBreak = (launchBreakEnd - launchBreakStart).Hours;


            if (reservationEndDate > launchBreakStart && startFullDate < launchBreakStart)
            {
                reservationEndDate = reservationEndDate.AddHours(launchBreak);
            }

            if (reservationEndDate > todayEndHours)
            {
                var remainingTime = (reservationEndDate - todayEndHours).Hours;
                var nextDayStartHours = todayStartHours.AddDays(1);
                var nextDayEndHours = todayEndHours.AddDays(1);
                reservationEndDate = nextDayStartHours.AddHours(remainingTime);
                var nextDayLaunchBreakStart = launchBreakStart.AddDays(1);
                if (reservationEndDate > nextDayLaunchBreakStart)
                {
                    reservationEndDate = reservationEndDate.AddHours(launchBreak);
                }
                if (reservationEndDate > nextDayEndHours)
                    reservationEndDate = CalculateEndDate(nextDayStartHours, remainingTime);
            }

            if (reservationEndDate.DayOfWeek == DayOfWeek.Saturday)
                reservationEndDate = reservationEndDate.AddDays(2);

            if (reservationEndDate.DayOfWeek == DayOfWeek.Sunday)
                reservationEndDate = reservationEndDate.AddDays(1);

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

        public async Task<ServiceResponse<GetReservationDto>> EditService(EditServiceDto editedReservation)
        {
            if (!await ValidateReservation(
                editedReservation.WorkStation,
                editedReservation.Estimate,
                editedReservation.Date,
                editedReservation.Id
                ))
                throw new HttpRequestException("Reservation not valid");
            var response = new ServiceResponse<GetReservationDto>();
            var reservation = _mapper.Map<Reservation>(editedReservation);
            var edit = await _reservationRepository.EditReservations(reservation);
            if (edit == null)
            {
                throw new KeyNotFoundException("Reservation not found");
            }
            response.Data = _mapper.Map<GetReservationDto>(edit);
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

        public async Task<ServiceResponse<List<GetScheduleDto>>> GetSchedule()
        {
            var serviceResponse = new ServiceResponse<List<GetScheduleDto>>();
            var reservations = await _reservationRepository.GetSchedule();
            var allSchedule = new List<GetScheduleDto>();

            foreach (var reservation in reservations)
            {
                var schedule = new GetScheduleDto();
                
                schedule.Id = reservation.Id;
                schedule.Title = reservation.PlateNumber;
                schedule.Start = reservation.Date;
                schedule.End = CalculateEndDate(reservation.Date, reservation.Estimate);
                schedule.Resource = reservation.WorkStation;
                schedule.Reservation = reservation;
                
                allSchedule.Add(schedule);
            }

            serviceResponse.Data = allSchedule;

            return serviceResponse;
        }
    }
}
