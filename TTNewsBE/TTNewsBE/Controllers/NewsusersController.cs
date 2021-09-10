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
    public class NewsusersController : ControllerBase
    {
        private readonly NewsDbContext _context;

        public NewsusersController(NewsDbContext context)
        {
            _context = context;
        }

        // GET: api/Newsusers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Newsuser>>> GetNewsusers()
        {
            return await _context.Newsusers.ToListAsync();
        }

        // GET: api/Newsusers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Newsuser>> GetNewsuser(string id)
        {
            var newsuser = await _context.Newsusers.FindAsync(id);

            if (newsuser == null)
            {
                return NotFound();
            }

            return newsuser;
        }

        // PUT: api/Newsusers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNewsuser(string id, Newsuser newsuser)
        {
            if (id != newsuser.Userid)
            {
                return BadRequest();
            }

            _context.Entry(newsuser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsuserExists(id))
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

        // POST: api/Newsusers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Newsuser>> PostNewsuser(Newsuser newsuser)
        {
            _context.Newsusers.Add(newsuser);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (NewsuserExists(newsuser.Userid))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetNewsuser", new { id = newsuser.Userid }, newsuser);
        }

        // DELETE: api/Newsusers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNewsuser(string id)
        {
            var newsuser = await _context.Newsusers.FindAsync(id);
            if (newsuser == null)
            {
                return NotFound();
            }

            _context.Newsusers.Remove(newsuser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NewsuserExists(string id)
        {
            return _context.Newsusers.Any(e => e.Userid == id);
        }
    }
}
