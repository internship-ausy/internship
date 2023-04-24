using AutoMapper;
using ServiceManager.Application.Dtos.Reservation;
using ServiceManager.Application.Dtos.User;
using ServiceManager.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
           
        }
    }
}
