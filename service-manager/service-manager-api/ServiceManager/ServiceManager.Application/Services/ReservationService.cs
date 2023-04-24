using AutoMapper;
using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Interfaces;
using ServiceManager.Domain.Interfaces.Repositories;
using ServiceManager.Domain.Models;

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
        public async Task<ServiceResponse<List<GetDashboardCardDto>>> GetDashboardCards()
        {
            var serviceResponse = new ServiceResponse<List<GetDashboardCardDto>>();
            var dashboardCards = await _reservationRepository.GetDashboardCards();
            serviceResponse.Data = dashboardCards.Select(d => _mapper.Map<GetDashboardCardDto>(d)).ToList();
            return serviceResponse;
        }
    }
}
