using System;

namespace Domain;

public class Tag
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTimeOffset Created { get; set; }
    public DateTimeOffset? Updated { get; set; }
}