using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TTNewsBE.Models;
using TTNewsBE.Services;

namespace TTNewsBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusapprovesController : ControllerBase
    {
        private readonly StatusapproveService _statusapproveService;

        public StatusapprovesController(StatusapproveService service)
        {
            _statusapproveService = service;
        }

        // GET: api/Statusapproves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Statusapprove>>> GetAll()
        {
            var status = await _statusapproveService.GetAllAsync();
            return Ok(status);
        }

        // GET: api/Statusapproves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Statusapprove>> GetById(string id)
        {
            var statusapprove = await _statusapproveService.GetByIdAsync(id);

            if (statusapprove == null)
            {
                return NotFound();
            }

            return Ok(statusapprove);
        }

        // PUT: api/Statusapproves/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Statusapprove updateStatusapprove)
        {
            var queriedStatus = await _statusapproveService.GetByIdAsync(id);
            if (queriedStatus == null)
            {
                return NotFound();
            }
            await _statusapproveService.UpdateAsync(id, updateStatusapprove);
            return NoContent();
        }

        // POST: api/Statusapproves
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Statusapprove>> Create(Statusapprove statusapprove)
        {
            await _statusapproveService.CreateAsync(statusapprove);
            return Ok(statusapprove);
        }

        // DELETE: api/Statusapproves/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var statusapprove = await _statusapproveService.GetByIdAsync(id); 
            if (statusapprove == null)
            {
                return NotFound();
            }
            await _statusapproveService.DeleteAsync(id);
            return NoContent();
        }
    }
}
