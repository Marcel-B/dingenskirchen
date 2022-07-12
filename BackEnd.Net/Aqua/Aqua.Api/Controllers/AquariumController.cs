using System.ComponentModel.DataAnnotations;
using com.marcelbenders.Aqua.Api.Extensions;
using com.marcelbenders.Aqua.Application.Command;
using com.marcelbenders.Aqua.Application.Query;
using com.marcelbenders.Aqua.Domain.Sql;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace com.marcelbenders.Aqua.Api.Controllers;

[ApiController]
[AllowAnonymous]
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
        return await _mediator.Send(new GetAquarienQuery(HttpContext.GetUserIdentifier() ?? "foo"), cancellationToken);
    }

    [HttpPost]
    [ActionName("CreateOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Aquarium), StatusCodes.Status201Created)]
    public async Task<Aquarium> CreateOneAsync(
        [FromBody, Required] CreateAquariumCommand command,
        CancellationToken cancellationToken)
    {
        var userId = HttpContext.GetUserIdentifier();
        command.UserId = userId;
        return await _mediator.Send(command, cancellationToken);
    }

    [HttpPut("{id}")]
    [ActionName("updateOneAsync"), Produces("application/json")]
    [ProducesResponseType(typeof(Aquarium), StatusCodes.Status201Created)]
    public async Task<Aquarium> UpdateOneAsync(
        [FromRoute, Required] string id,
        [FromBody, Required] UpdateAquariumCommand command,
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
        await _mediator.Send(new DeleteAquariumCommand {Id = id}, cancellationToken);
        return Ok(id);
    }
}