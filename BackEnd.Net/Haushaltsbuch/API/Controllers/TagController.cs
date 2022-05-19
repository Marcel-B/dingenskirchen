using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using Application.Tags.Commands;
using Application.Tags.Queries;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TagController : BaseApiController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Tag>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<Tag>>> GetTags()
        {
            return await Mediator.Send(new GetTagsQuery());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Tag))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Tag>> GetTag(Guid id)
        {
            return await Mediator.Send(new GetTagQuery {Id = id});
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> GetTag(Guid id, CancellationToken cancellationToken)
        {
            return Ok(await Mediator.Send(new DeleteTagCommand {Id = id}, cancellationToken));
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateBuchung(Tag tag)
        {
            if (tag == null)
            {
                return BadRequest();
            }

            return Created(nameof(GetTag), await Mediator.Send(new CreateTagCommand {Tag = tag}));
        }
    }
}