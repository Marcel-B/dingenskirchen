using System;
using System.Collections.Generic;

namespace Domain
{
    /// <summary>
    /// Repräsentiert eine Buchung
    /// </summary>
    public record Buchung
    {
        /// <summary>
        /// Technischer Schlüssel
        /// </summary>
        public Guid Id { get; init; }
        
        /// <summary>
        /// Der Name der Buchung
        /// </summary>
        public string Name { get; init; }
        
        /// <summary>
        /// Eine Beschreibung
        /// </summary>
        public string Beschreibung { get; init; }

        /// <summary>
        /// Der Zeitpunkt der Buchung, wann sie für gewöhnlich fällig ist
        /// </summary>
        public DateTime Zeitpunkt { get; init; }
        
        /// <summary>
        /// Der Betrag der Buchung. Hierbei handelt es sich um dem Monatliche
        /// Betrag.
        /// </summary>
        public decimal Betrag { get; init; }
        
        /// <summary>
        /// Die Kategorie, ob es ein Ein- oder Abgang ist.
        /// </summary>
        public Kategorie Kategorie { get; init; }
        
        /// <summary>
        /// Wie oft die Buchung ansteht. Aus Betrag und Intervall kann die
        /// eigentliche Summe errechnet werden.
        /// </summary>
        public Intervall Intervall { get; init; }
        
        /// <summary>
        /// Das Erstellungsdatum der Buchung
        /// </summary>
        public DateTime Created { get; init; }
        
        /// <summary>
        /// Die letzte Aktualisierung der Buchung
        /// </summary>
        public DateTime? Updated { get; init; }

        /// <summary>
        /// Zeigt an, ob die Buchung gelöscht ist
        /// </summary>
        public bool IsDeleted { get; init; }

        /// <summary>
        /// Gesetzte Tags
        /// </summary>
        public ICollection<Tag> Tags { get; init; } = new List<Tag>();
    }
}