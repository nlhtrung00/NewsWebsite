﻿using System;
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
    public class NewsusersController : ControllerBase
    {
        private readonly NewsuserService _newsuserService;
        private readonly RoleService _roleService;

        public NewsusersController(NewsuserService nService, RoleService rService)
        {
            _newsuserService = nService;
            _roleService = rService;
        }

        // GET: api/Newsusers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Newsuser>>> GetAll()
        {
            var newsusers = await _newsuserService.GetAllAsync();
            return Ok(newsusers);
        }

        // GET: api/Newsusers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Newsuser>> GetById(string id)
        {
            var newsuser = await _newsuserService.GetByIdAsync(id);
            if (newsuser == null)
            {
                return NotFound();
            }

            return Ok(newsuser);
        }

        // PUT: api/Newsusers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, Newsuser updateNewsuser)
        {
            var queriedNewsuser = await _newsuserService.GetByIdAsync(id);
            if (queriedNewsuser == null)
            {
                return NotFound();
            }
            await _newsuserService.UpdateAsync(id, updateNewsuser);
            return NoContent();
        }

        // POST: api/Newsusers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Newsuser>> Create(Newsuser newsuser)
        {
            await _newsuserService.CreateAsync(newsuser);
            return Ok(newsuser);
        }

        // DELETE: api/Newsusers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var newsuser = await _newsuserService.GetByIdAsync(id);
            if (newsuser == null)
            {
                return NotFound();
            }
            await _newsuserService.DeleteAsync(id);
            return NoContent();
        }
    }
}