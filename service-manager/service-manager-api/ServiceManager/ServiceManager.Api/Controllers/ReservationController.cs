using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Models;

namespace ServiceManager.Api.Controllers
{
    [Authorize]
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
        
        [HttpPut]
        public async Task<ActionResult<ServiceResponse<int>>> EditService(EditServiceDto editedService)
        {
            var response = await _reservationService.EditService(editedService);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
    
}
