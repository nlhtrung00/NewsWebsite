using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TTNewsBE.Models;

namespace TTNewsBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusapprovesController : ControllerBase
    {
        private readonly NewsDbContext _context;

        public StatusapprovesController(NewsDbContext context)
        {
            _context = context;
        }

        // GET: api/Statusapproves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Statusapprove>>> GetStatusapproves()
        {
            return await _context.Statusapproves.ToListAsync();
        }

        // GET: api/Statusapproves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Statusapprove>> GetStatusapprove(int id)
        {
            var statusapprove = await _context.Statusapproves.FindAsync(id);

            if (statusapprove == null)
            {
                return NotFound();
            }

            return statusapprove;
        }

        // PUT: api/Statusapproves/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStatusapprove(int id, Statusapprove statusapprove)
        {
            if (id != statusapprove.Id_status)
            {
                return BadRequest();
            }

            _context.Entry(statusapprove).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StatusapproveExists(id))
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

        // POST: api/Statusapproves
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Statusapprove>> PostStatusapprove(Statusapprove statusapprove)
        {
            _context.Statusapproves.Add(statusapprove);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStatusapprove", new { id = statusapprove.Id_status }, statusapprove);
        }

        // DELETE: api/Statusapproves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStatusapprove(int id)
        {
            var statusapprove = await _context.Statusapproves.FindAsync(id);
            if (statusapprove == null)
            {
                return NotFound();
            }

            _context.Statusapproves.Remove(statusapprove);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StatusapproveExists(int id)
        {
            return _context.Statusapproves.Any(e => e.Id_status == id);
        }
    }
}
