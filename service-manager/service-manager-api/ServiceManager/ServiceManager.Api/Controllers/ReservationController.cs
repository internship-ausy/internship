using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Models;

namespace ServiceManager.Api.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {

        private readonly IReservationService _reservationService;
        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet("GetDashboardCard")]
        public async Task<ActionResult<ServiceResponse<List<GetDashboardCardDto>>>> GetDashboardCards()
        {
            return Ok(await _reservationService.GetDashboardCards());
        }

        [HttpPost("AddReservation")]
        public async Task<ActionResult<ServiceResponse<int>>> AddReservation(AddServiceDto newReservation)
        {
            var response = await _reservationService.AddReservation(newReservation);


            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpDelete("DeleteReservation")]
        public async Task<ActionResult<ServiceResponse<GetReservationDto>>> DeleteReservation(int id)
        {
            var response = await _reservationService.DeleteReservation(id);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);

        }
        
        [HttpPut("EditReservation")]
        public async Task<ActionResult<ServiceResponse<GetReservationDto>>> EditService(EditServiceDto editedService)
        {
            var response = await _reservationService.EditService(editedService);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
        
        [HttpGet("GetReservationByID")]
        public async Task<ActionResult<ServiceResponse<GetReservationDto>>> GetReservationByID(int reservationID)
        {
            var response = await _reservationService.getReservationByID(reservationID);
            if (response.Success == false)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
        
        [HttpGet("GetSchedule")]
        public async Task<ActionResult<ServiceResponse<List<GetScheduleDto>>>> GetSchedule()
        {
            return Ok(await _reservationService.GetSchedule());
        }

        [HttpGet("GetHistoryReservations")]
        public async Task<ActionResult<ServiceResponse<List<LogsDto>>>> GetHistoryReservations()
        {
            return Ok(await _reservationService.GetHistoryReservations());
        }

        [HttpGet("GetUpcomingReservations")]
        public async Task<ActionResult<ServiceResponse<List<LogsDto>>>> GetUpcomingReservations()
        {
            return Ok(await _reservationService.GetUpcomingReservations());
        }
    } 
}
