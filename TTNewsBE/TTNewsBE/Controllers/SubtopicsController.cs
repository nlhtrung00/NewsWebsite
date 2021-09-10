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
    public class SubtopicsController : ControllerBase
    {
        private readonly NewsDbContext _context;

        public SubtopicsController(NewsDbContext context)
        {
            _context = context;
        }

        // GET: api/Subtopics
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subtopic>>> GetSubtopics()
        {
            return await _context.Subtopics.ToListAsync();
        }

        // GET: api/Subtopics/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subtopic>> GetSubtopic(int id)
        {
            var subtopic = await _context.Subtopics.FindAsync(id);

            if (subtopic == null)
            {
                return NotFound();
            }

            return subtopic;
        }

        // PUT: api/Subtopics/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubtopic(int id, Subtopic subtopic)
        {
            if (id != subtopic.Id_subtopic)
            {
                return BadRequest();
            }

            _context.Entry(subtopic).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubtopicExists(id))
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

        // POST: api/Subtopics
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Subtopic>> PostSubtopic(Subtopic subtopic)
        {
            _context.Subtopics.Add(subtopic);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubtopic", new { id = subtopic.Id_subtopic }, subtopic);
        }

        // DELETE: api/Subtopics/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubtopic(int id)
        {
            var subtopic = await _context.Subtopics.FindAsync(id);
            if (subtopic == null)
            {
                return NotFound();
            }

            _context.Subtopics.Remove(subtopic);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubtopicExists(int id)
        {
            return _context.Subtopics.Any(e => e.Id_subtopic == id);
        }
    }
}
