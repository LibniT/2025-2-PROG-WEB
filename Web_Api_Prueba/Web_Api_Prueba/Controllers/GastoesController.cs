using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_Api_Prueba.Data;
using Web_Api_Prueba.Models;

namespace Web_Api_Prueba.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GastoesController : ControllerBase
    {
        private readonly ConexionContext _context;

        public GastoesController(ConexionContext context)
        {
            _context = context;
        }

        // GET: api/Gastoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gasto>>> GetGastos()
        {
            return await _context.Gastos.ToListAsync();
        }

        // GET: api/Gastoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Gasto>> GetGasto(int id)
        {
            var gasto = await _context.Gastos.FindAsync(id);

            if (gasto == null)
            {
                return NotFound();
            }

            return gasto;
        }

        // PUT: api/Gastoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGasto(int id, Gasto gasto)
        {
            if (id != gasto.IdGasto)
            {
                return BadRequest();
            }

            _context.Entry(gasto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GastoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Gastoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Gasto>> PostGasto(Gasto gasto)
        {
            _context.Gastos.Add(gasto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGasto", new { id = gasto.IdGasto }, gasto);
        }

        // DELETE: api/Gastoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGasto(int id)
        {
            var gasto = await _context.Gastos.FindAsync(id);
            if (gasto == null)
            {
                return NotFound();
            }

            _context.Gastos.Remove(gasto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool GastoExists(int id)
        {
            return _context.Gastos.Any(e => e.IdGasto == id);
        }
    }
}
