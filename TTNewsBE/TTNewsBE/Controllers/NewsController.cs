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
    public class NewsController : ControllerBase
    {
        private readonly NewsService _newsService;
        private readonly TopicService _topicService;
        private readonly SubtopicService _subtopicService;
        private readonly NewsuserService _newsuserService;



        public NewsController(NewsService newsService, TopicService topicService, SubtopicService subtopicService, NewsuserService newsuserService)
        {
            _newsService = newsService;
            _topicService = topicService;
            _subtopicService = subtopicService;
            _newsuserService = newsuserService;
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
        public async Task<ActionResult<News>> Create(News news)
        {
            await _newsService.CreateAsync(news);
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
