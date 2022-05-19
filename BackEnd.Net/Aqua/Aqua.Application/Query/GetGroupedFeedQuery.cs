using com.marcelbenders.Aqua.Application.Dto;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public class GetGroupedFeedQuery : IRequest<Feed>
{
    public short Tage { get; init; } = short.MaxValue;
}