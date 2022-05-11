using com.marcelbenders.Aqua.Domain;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public class GetFeedQuery : IRequest<IEnumerable<Feed>>
{
    
    public short Tage { get; init; } = short.MaxValue;
}