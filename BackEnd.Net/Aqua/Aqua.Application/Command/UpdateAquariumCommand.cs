using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Command;

public record UpdateAquariumCommand : CreateAquariumCommand, IRequest<Aquarium>
{
    public string Id { get; init; }
}