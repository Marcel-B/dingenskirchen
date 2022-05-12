using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public class GetFeedQuery : IRequest<IEnumerable<IFeedItem>>
{
    
    public short Tage { get; init; } = short.MaxValue;
}