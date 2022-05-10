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

   public MessungController(IMediator mediator)
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
}