using System;
using System.Collections.Generic;

namespace Domain;

public record Tag
{
    public Guid Id { get; init; }
    public string Name { get; init; }
    public DateTimeOffset Created { get; init; }
    public DateTimeOffset? Updated { get; init; }

    /// <summary>
    /// Buchungen der Tags
    /// </summary>
    public ICollection<Buchung> Buchungen { get; init; } = new List<Buchung>();
}