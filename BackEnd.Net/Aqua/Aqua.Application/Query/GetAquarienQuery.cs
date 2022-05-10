using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetAquarienQuery(long? Number = null) : IRequest<IEnumerable<Aquarium>>;