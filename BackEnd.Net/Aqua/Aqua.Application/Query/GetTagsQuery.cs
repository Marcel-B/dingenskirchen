using MediatR;

namespace com.marcelbenders.Aqua.Application.Query;

public record GetTagsQuery : IRequest<IEnumerable<string>>;