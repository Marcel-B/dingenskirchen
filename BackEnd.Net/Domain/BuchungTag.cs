using System;

namespace Domain;

public class BuchungTag
{
    public Guid BuchungId { get; set; }
    public Guid TagId { get; set; }
    public virtual Buchung Buchung { get; set; }
    public virtual Tag Tag { get; set; }
}