using System.ComponentModel.DataAnnotations;
using com.marcelbenders.Aqua.Api.Extensions;
using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain.Sql;
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
        return await _mediator.Send(new GetMessungenQuery(HttpContext.GetUserIdentifier()), cancellationToken);
    }

    [HttpPut("{id}")]
    [ActionName("updateOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Messung), StatusCodes.Status201Created)]
    public async Task<Messung> UpdateOneAsync(
        [FromRoute, Required] Guid id,
        [FromBody, Required] UpdateMessungCommand command,
        CancellationToken cancellationToken)
    {
        command.UserId = HttpContext.GetUserIdentifier();
        return await _mediator.Send(command, cancellationToken);
    }

    [HttpPost]
    [ActionName("CreateOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Messung), StatusCodes.Status201Created)]
    public async Task<Messung> CreateOneAsync([FromBody, Required] CreateMessungCommand command,
        CancellationToken cancellationToken)
    {
        command.UserId = HttpContext.GetUserIdentifier();
        return await _mediator.Send(command, cancellationToken);
    }

    [HttpDelete("{id}")]
    [ActionName("DeleteOneAsync"), Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteOneAsync(
        [FromRoute, Required] Guid id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteMessungCommand {Id = id}, cancellationToken);
        return Ok(id);
    }
}