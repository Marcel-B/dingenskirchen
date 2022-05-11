using com.marcelbenders.Aqua.Application.Query;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace com.marcelbenders.Aqua.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TagController : ControllerBase
{
    private readonly IMediator _mediator;

    public TagController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ActionName("GetAll"), Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<string>> GetAll(
        CancellationToken cancellationToken)
    {
        return await _mediator.Send(new GetTagsQuery(), cancellationToken);
    }
}