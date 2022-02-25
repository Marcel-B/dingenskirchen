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
            CreateMap<Buchung, Buchung>();
            CreateMap<Buchung, BuchungDto>();
        }
    }
}