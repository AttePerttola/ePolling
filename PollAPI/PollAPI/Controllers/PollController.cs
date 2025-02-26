using Microsoft.AspNetCore.Mvc;
using PollAPI.Services;


namespace PollAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PollController : ControllerBase
    {
        private readonly List<Poll> _polls;
        private readonly ILogger<PollController> _logger;

        public PollController(ILogger<PollController> logger, PollService pollService)
        {
            _logger = logger;
            _polls = pollService.Polls; // Use shared list from service
        }

        [HttpGet("getAll")]
        public ActionResult<List<Poll>> GetPolls()
        {
            return Ok(_polls);
        }

        [HttpGet("{id}")]
        public Poll? GetPollById(int id)
        {
            return _polls.FirstOrDefault(pol => pol.Id == id);
        }

        // PUT endpoint to add a vote
        [HttpPut("{pollId}/vote/{optionId}")]
        public IActionResult AddVote(int pollId, int optionId)
        {
            var poll = _polls.FirstOrDefault(p => p.Id == pollId);
            if (poll == null)
            {
                return NotFound(new { message = "Poll not found" });
            }

            var option = poll.Options.FirstOrDefault(o => o.Id == optionId);
            if (option == null)
            {
                return NotFound(new { message = "Option not found" });
            }

            option.Votes++; // Increment vote count

            _logger.LogInformation($"Vote added to Poll {pollId}, Option {optionId}. Total Votes: {option.Votes}");

            return Ok(new { poll.Options });
        }
        // POST: Add a new poll
        [HttpPost]
        public IActionResult AddPoll([FromBody] Poll newPoll)
        {
            if (string.IsNullOrEmpty(newPoll.Title) || newPoll.Options == null || newPoll.Options.Count == 0)
            {
                return BadRequest(new { message = "Poll must have a title and at least one option" });
            }

            newPoll.Id = _polls.Count > 0 ? _polls.Max(p => p.Id) + 1 : 1;

            // Assign unique IDs to options
            int optionId = 1;
            foreach (var option in newPoll.Options)
            {
                option.Id = optionId++;
                option.Votes = 0; // Ensure new polls start with 0 votes
            }

            _polls.Add(newPoll);

            _logger.LogInformation($"New poll added: {newPoll.Title}");

            return CreatedAtAction(nameof(GetPolls), new { id = newPoll.Id }, newPoll);
        }
    }
}
