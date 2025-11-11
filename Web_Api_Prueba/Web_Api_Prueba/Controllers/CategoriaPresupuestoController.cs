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
    public class CategoriaPresupuestoController : ControllerBase
    {
        private readonly ConexionContext _context;

        public CategoriaPresupuestoController(ConexionContext context)
        {
            _context = context;
        }

        // GET: api/CategoriaPresupuesto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaPresupuesto>>> GetCategoriaPresupuestos()
        {
            return await _context.CategoriaPresupuestos.ToListAsync();
        }

        // GET: api/CategoriaPresupuesto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriaPresupuesto>> GetCategoriaPresupuesto(int id)
        {
            var categoriaPresupuesto = await _context.CategoriaPresupuestos.FindAsync(id);

            if (categoriaPresupuesto == null)
            {
                return NotFound();
            }

            return categoriaPresupuesto;
        }

        // PUT: api/CategoriaPresupuesto/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategoriaPresupuesto(int id, CategoriaPresupuesto categoriaPresupuesto)
        {
            if (id != categoriaPresupuesto.Id)
            {
                return BadRequest();
            }

            _context.Entry(categoriaPresupuesto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoriaPresupuestoExists(id))
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

        // POST: api/CategoriaPresupuesto
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CategoriaPresupuesto>> PostCategoriaPresupuesto(CategoriaPresupuesto categoriaPresupuesto)
        {
            _context.CategoriaPresupuestos.Add(categoriaPresupuesto);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategoriaPresupuesto", new { id = categoriaPresupuesto.Id }, categoriaPresupuesto);
        }

        // DELETE: api/CategoriaPresupuesto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoriaPresupuesto(int id)
        {
            var categoriaPresupuesto = await _context.CategoriaPresupuestos.FindAsync(id);
            if (categoriaPresupuesto == null)
            {
                return NotFound();
            }

            _context.CategoriaPresupuestos.Remove(categoriaPresupuesto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CategoriaPresupuestoExists(int id)
        {
            return _context.CategoriaPresupuestos.Any(e => e.Id == id);
        }
    }
}
