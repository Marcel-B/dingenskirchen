using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateAquariumCommand : CreateAquariumCommand, IRequest<Aquarium>
{
    public Guid Id { get; init; }
}