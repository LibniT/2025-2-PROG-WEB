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
    public class CategoriaGastoesController : ControllerBase
    {
        private readonly ConexionContext _context;

        public CategoriaGastoesController(ConexionContext context)
        {
            _context = context;
        }

        // GET: api/CategoriaGastoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaGasto>>> GetCategoriaGastos()
        {
            return await _context.CategoriaGastos.ToListAsync();
        }

        // GET: api/CategoriaGastoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriaGasto>> GetCategoriaGasto(int id)
        {
            var categoriaGasto = await _context.CategoriaGastos.FindAsync(id);

            if (categoriaGasto == null)
            {
                return NotFound();
            }

            return categoriaGasto;
        }

        // PUT: api/CategoriaGastoes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoriaGasto(int id, CategoriaGasto categoriaGasto)
        {
            if (id != categoriaGasto.IdCategoriaGasto)
            {
                return BadRequest();
            }

            _context.Entry(categoriaGasto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriaGastoExists(id))
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

        // POST: api/CategoriaGastoes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CategoriaGasto>> PostCategoriaGasto(CategoriaGasto categoriaGasto)
        {
            _context.CategoriaGastos.Add(categoriaGasto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategoriaGasto", new { id = categoriaGasto.IdCategoriaGasto }, categoriaGasto);
        }

        // DELETE: api/CategoriaGastoes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoriaGasto(int id)
        {
            var categoriaGasto = await _context.CategoriaGastos.FindAsync(id);
            if (categoriaGasto == null)
            {
                return NotFound();
            }

            _context.CategoriaGastos.Remove(categoriaGasto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoriaGastoExists(int id)
        {
            return _context.CategoriaGastos.Any(e => e.IdCategoriaGasto == id);
        }
    }
}
