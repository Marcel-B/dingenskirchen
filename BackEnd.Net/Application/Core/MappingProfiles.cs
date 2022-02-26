using System;
using System.Linq;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Buchung, Buchung>()
                .ForMember(d => d.Updated, opt => opt.MapFrom(a => DateTime.Now));
            CreateMap<BuchungDto, Buchung>().ReverseMap();
        }
    }
}