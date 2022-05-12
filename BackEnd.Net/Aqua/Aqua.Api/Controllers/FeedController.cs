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
    [ActionName("GetAll"), Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<IFeedItem>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<IFeedItem>> GetAll(
        CancellationToken cancellationToken)
    {
        return await _mediator.Send(new GetFeedQuery(), cancellationToken);
    }
}