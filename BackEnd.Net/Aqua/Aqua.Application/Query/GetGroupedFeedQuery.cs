using com.marcelbenders.Aqua.Application.Dto;
using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetGroupedFeedQuery(string UserId, short? Tage) : IRequest<Feed>;