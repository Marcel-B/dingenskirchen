using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;
using Application.Activities;
using Application.Buchungen;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuchungenController : BaseApiController
    {

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(List<Buchung>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<BuchungDto>>> GetBuchungen()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Buchung))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Buchung>> GetBuchung(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> CreateBuchung(BuchungDto buchung)
        {
            if(buchung == null)
            {
                return BadRequest();
            }

            return Created(nameof(GetBuchung), await Mediator.Send(new Create.Command {Buchung = buchung}));
        }

        [HttpPut("{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> EditBuchung(Guid id, Buchung buchung)
        {
            // buchung.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Buchung = buchung}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBuchung(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}