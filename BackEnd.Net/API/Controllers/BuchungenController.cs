using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Buchungen;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuchungenController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Buchung>>> GetBuchungen()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Buchung>> GetBuchung(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateBuchung(Buchung buchung)
        {
            return Ok(await Mediator.Send(new Create.Command {Buchung = buchung}));
        }

        [HttpPut("{id}")]
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