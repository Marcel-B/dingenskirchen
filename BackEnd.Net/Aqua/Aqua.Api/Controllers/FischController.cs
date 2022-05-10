using System.ComponentModel.DataAnnotations;
using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace com.marcelbenders.Aqua.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FischController : ControllerBase
{
    private readonly IMediator _mediator;

    public FischController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ActionName("GetAll"), Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<Fisch>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<Fisch>> GetAll(
        CancellationToken cancellationToken)
    {
        return await _mediator.Send(new GetFischeQuery(), cancellationToken);
    }

    [HttpPost]
    [ActionName("CreateOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Fisch), StatusCodes.Status201Created)]
    public async Task<Fisch> CreateOneAsync(
        [FromBody, Required] CreateFischCommand command,
        CancellationToken cancellationToken)
    {
        return await _mediator.Send(command, cancellationToken);
    }

    [HttpDelete("{id}")]
    [ActionName("DeleteOneAsync"), Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteOneAsync(
        [FromRoute, Required] string id,
        CancellationToken cancellationToken)
    {
        await _mediator.Send(new DeleteFischCommand {Id = id}, cancellationToken);
        return Ok(id);
    }
}