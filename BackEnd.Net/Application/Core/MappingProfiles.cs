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

            CreateMap<BuchungDto, Buchung>()
                .ForMember(d => d.Tags, opt => opt.MapFrom(b => b.Tags.Select(t => new Tag { Name = t})));

            CreateMap<Buchung, BuchungDto>()
                .ForMember(dest => dest.Tags, src => src.MapFrom(buchung => buchung.Tags.Select(tag => tag.Name)));
        }
    }
}
