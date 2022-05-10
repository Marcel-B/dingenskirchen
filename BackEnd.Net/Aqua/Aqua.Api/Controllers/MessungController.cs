using System.ComponentModel.DataAnnotations;
using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace com.marcelbenders.Aqua.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessungController : ControllerBase
{
    private readonly IMediator _mediator;

    public MessungController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ActionName("GetAll"), Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<Messung>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<Messung>> GetAll(CancellationToken cancellationToken)
    {
        return await _mediator.Send(new GetMessungQuery(), cancellationToken);
    }

    [HttpPost]
    [ActionName("CreateOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Messung), StatusCodes.Status201Created)]
    public async Task<Messung> CreateOneAsync([FromBody, Required] CreateMessungCommand command,
        CancellationToken cancellationToken)
    {
        return await _mediator.Send(command, cancellationToken);
    }

    [HttpDelete("{id}")]
    [ActionName("DeleteOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Messung), StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteOneAsync([FromRoute, Required] string id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteMessungCommand {Id = id}, cancellationToken);
        return NoContent();
    }
}