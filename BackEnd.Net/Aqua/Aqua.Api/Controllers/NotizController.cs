using System.ComponentModel.DataAnnotations;
using com.marcelbenders.Aqua.Api.Extensions;
using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace com.marcelbenders.Aqua.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotizController : ControllerBase
{
    private readonly IMediator _mediator;

    public NotizController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ActionName("GetAll"), Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<Notiz>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<Notiz>> GetAll(
        CancellationToken cancellationToken)
    {
        return await _mediator.Send(new GetNotizenQuery(HttpContext.GetUserIdentifier()), cancellationToken);
    }

    [HttpPost]
    [ActionName("CreateOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Notiz), StatusCodes.Status201Created)]
    public async Task<Notiz> CreateOneAsync(
        [FromBody, Required] CreateNotizCommand command,
        CancellationToken cancellationToken)
    {
        command.UserId = HttpContext.GetUserIdentifier();
        return await _mediator.Send(command, cancellationToken);
    }
    
    [HttpPut("{id}")]
    [ActionName("updateOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Notiz), StatusCodes.Status201Created)]
    public async Task<Notiz> UpdateOneAsync(
        [FromRoute, Required] string id,
        [FromBody, Required] UpdateNotizCommand command,
        CancellationToken cancellationToken)
    {
        command.UserId = HttpContext.GetUserIdentifier();
        return await _mediator.Send(command, cancellationToken);
    }

    [HttpDelete("{id}")]
    [ActionName("DeleteOneAsync"), Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteOneAsync(
        [FromRoute, Required] string id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteNotizCommand {Id = id}, cancellationToken);
        return Ok(id);
    }
}