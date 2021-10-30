﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TTNewsBE.Models;
using TTNewsBE.Services;

namespace TTNewsBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly NewsService _newsService;
        private readonly TopicService _topicService;
        private readonly SubtopicService _subtopicService;
        private readonly NewsuserService _newsuserService;
        private readonly IWebHostEnvironment _webHostEnvironment;



        public NewsController(NewsService newsService, TopicService topicService, SubtopicService subtopicService, NewsuserService newsuserService, IWebHostEnvironment webHostEnvironment)
        {
            _newsService = newsService;
            _topicService = topicService;
            _subtopicService = subtopicService;
            _newsuserService = newsuserService;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/News
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetAll()
        {
            var news = await _newsService.GetAllAsync();
            return Ok(news);
        }

        // GET: api/News/5
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<News>> GetById(string id)
        {
            var news = await _newsService.GetByIdAsync(id);

            if (news == null)
            {
                return NotFound();
            }

            return Ok(news);
        }

        [HttpGet("GetByTopic/{id}")]
        public async Task<ActionResult<IEnumerable<News>>> GetByTopic(string id)
        {
            var news = await _newsService.GetByTopicAsync(id);
            return Ok(news);
        }

        [HttpGet("GetByStatus/{status}")]
        public async Task<ActionResult<IEnumerable<News>>> GetByStatus(string status)
        {
            var news = await _newsService.GetByStatusAsync(status);
            return Ok(news);
        }


        // PUT: api/News/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, News updateNews)
        {
            var queriedNews = await _newsService.GetByIdAsync(id);
            if (queriedNews == null)
            {
                return NotFound();
            }
            await _newsService.UpdateAsync(id, updateNews);

            return NoContent();
        }

        // POST: api/News
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult> Create([FromForm] News news)
        {
            if (news.Image.Length > 0)
            {
                try
                {
                    if(!Directory.Exists(_webHostEnvironment.WebRootPath + "\\Images\\"))
                    {
                        Directory.CreateDirectory(_webHostEnvironment.WebRootPath + "\\Images\\");
                    }
                    using (FileStream fileStream = System.IO.File.Create(_webHostEnvironment.WebRootPath + "\\Images\\" + news.Image.FileName))
                    {
                        news.Image.CopyTo(fileStream);
                        fileStream.Flush();
                    }
                    news.ImageName = news.Image.FileName;
                    news.Image = null;
                    await _newsService.CreateAsync(news);
                }catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }else
            {
                return BadRequest();
            }
            return Ok(news);
        }

        // DELETE: api/News/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var news = await _newsService.GetByIdAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            await _newsService.DeleteAsync(id);

            return NoContent();
        }
        
    }
}
