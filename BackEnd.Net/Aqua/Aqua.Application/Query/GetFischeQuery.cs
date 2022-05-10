using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetFischeQuery(long? Number = null) : IRequest<IEnumerable<Fisch>>;