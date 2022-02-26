using System;
using System.Collections.Generic;
using Domain;

namespace Application.Activities
{

    public record BuchungDto
    {
        public Guid Id { get; init; }
        public string Name { get; init; }
        public DateTime Zeitpunkt { get; init; }
        public string Beschreibung { get; init; }
        public Kategorie Kategorie { get; init; }
        public Intervall Intervall { get; init; }
        public decimal Betrag { get; init; }
    }
}