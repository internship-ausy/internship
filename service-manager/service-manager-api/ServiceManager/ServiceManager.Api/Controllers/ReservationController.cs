using Microsoft.AspNetCore.Mvc;
using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Models;

namespace ServiceManager.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReservationController : ControllerBase
    {

        private readonly IReservationService _reservationService;
        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
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
    }
}
