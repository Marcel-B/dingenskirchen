using System.ComponentModel.DataAnnotations;
using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace com.marcelbenders.Aqua.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AquariumController : ControllerBase
{
    private readonly IMediator _mediator;

    public AquariumController(
        IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    [ActionName("GetAll"), Produces("application/json")]
    [ProducesResponseType(typeof(IEnumerable<Aquarium>), StatusCodes.Status200OK)]
    public async Task<IEnumerable<Aquarium>> GetAll(
        CancellationToken cancellationToken)
    {
        return await _mediator.Send(new GetAquarienQuery(), cancellationToken);
    }

    [HttpPost]
    [ActionName("CreateOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Aquarium), StatusCodes.Status201Created)]
    public async Task<Aquarium> CreateOneAsync(
        [FromBody, Required] CreateAquariumCommand command,
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
        await _mediator.Send(new DeleteAquariumCommand {Id = id}, cancellationToken);
        return Ok(id);
    }
}