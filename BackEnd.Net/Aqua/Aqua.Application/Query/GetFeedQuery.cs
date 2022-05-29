using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetFeedQuery(string UserId, short? Tage) : IRequest<IEnumerable<IFeedItem>>;