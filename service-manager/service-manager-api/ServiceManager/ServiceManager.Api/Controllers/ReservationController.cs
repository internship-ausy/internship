using Microsoft.AspNetCore.Mvc;
using ServiceManager.Application.Dtos.Reservation;
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

        [HttpGet("GetDashboardCard")]
        public async Task<ActionResult<ServiceResponse<List<GetDashboardCardDto>>>> GetDashboardCards()
        {
            return Ok(await _reservationService.GetDashboardCards());
        }
    }
}
