using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Activities
{
    public class BuchungDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public DateTime Zeitpunkt { get; set; }

        // public string Description { get; set; }
        public string Kategorie { get; set; }
        // public string City { get; set; }
        // public string Venue { get; set; }
        // public string HostUsername { get; set; }
        // public bool IsCancelled { get; set; }
        // public ICollection<Profile> Attendees { get; set; }
    }
}