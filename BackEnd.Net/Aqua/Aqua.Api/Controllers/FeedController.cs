using com.marcelbenders.Aqua.Application.Dto;
using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace com.marcelbenders.Aqua.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FeedController : ControllerBase
{
    private readonly IMediator _mediator;

    public FeedController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ActionName("GetAllAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<IFeedItem>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<IFeedItem>> GetAllAsync(
        CancellationToken cancellationToken)
    {
        return await _mediator.Send(new GetFeedQuery(), cancellationToken);
    }
    
    [HttpGet("Grouped")]
    [ActionName("GetAllGroupedAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Feed), StatusCodes.Status200OK)]
    public async Task<Feed> GetAllGroupedAsync(
        CancellationToken cancellationToken)
    {
        return await _mediator.Send(new GetGroupedFeedQuery(), cancellationToken);
    }
}