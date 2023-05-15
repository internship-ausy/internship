using AutoMapper;
using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Domain.Models;

namespace ServiceManager.Application.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, GetUserDto>().ReverseMap();

            CreateMap<User, RegisterDto>().ReverseMap();

            CreateMap<Reservation, GetDashboardCardDto>()
                .ForMember(dto => dto.FullName,
                    opts => opts.MapFrom(src => src.FirstName + ' ' + src.LastName));

            CreateMap<Reservation, GetReservationDto>()
                .ForMember(dto => dto.FullName,
                    opts => opts.MapFrom(src => src.FirstName + ' ' + src.LastName));

            CreateMap<AddServiceDto, Reservation>()
                .ForMember(r => r.FirstName,
                    opts => opts.MapFrom(src => src.FullName.Split(' ', StringSplitOptions.None)[0]))
                .ForMember(r => r.LastName,
                    opts => opts.MapFrom(src => src.FullName.Split(' ', StringSplitOptions.None)[1]));

            CreateMap<EditServiceDto, Reservation>()
                .ForMember(r => r.FirstName,
                    opts => opts.MapFrom(src => src.FullName.Split(' ', StringSplitOptions.None)[0]))
                .ForMember(r => r.LastName,
                    opts => opts.MapFrom(src => src.FullName.Split(' ', StringSplitOptions.None)[1]));

            CreateMap<Reservation, LogsDto>()
                .ForMember(log => log.FullName,
                    opts => opts.MapFrom(src => src.FirstName + ' ' + src.LastName));

            CreateMap<EditReservationDto, Reservation>()
                .ForMember(r => r.FirstName,
                    opts => opts.MapFrom(src => src.FullName.Split(' ', StringSplitOptions.None)[0]))
                .ForMember(r => r.LastName,
                    opts => opts.MapFrom(src => src.FullName.Split(' ', StringSplitOptions.None)[1]));
        }
    }
}
