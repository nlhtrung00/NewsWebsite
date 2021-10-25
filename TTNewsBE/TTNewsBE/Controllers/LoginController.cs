using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TTNewsBE.Models;
using TTNewsBE.Services;

namespace TTNewsBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly NewsuserService _newsuserService;

        public LoginController(NewsuserService nService)
        {
            _newsuserService = nService;
        }

        [HttpGet("{username}/{password}")]
        public async Task<ActionResult<Newsuser>> Login(string username, string password)
        {
            var newsuser = await _newsuserService.LoginAsync(username,password);
            if (newsuser == null)
            {
                return NotFound();
            }

            return Ok(newsuser);
        }
    }
}
