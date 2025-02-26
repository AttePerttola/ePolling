using System.Collections.Generic;

namespace PollAPI.Services
{
    public class PollService
    {
        public List<Poll> Polls { get; }

        public PollService()
        {
            Polls = new List<Poll>()
            {
                new Poll()
                {
                    Id = 1,
                    Title = "What is your favorite drink?",
                    Options = new List<Option>()
                    {
                        new Option() { Id = 1, Title = "Tea", Votes = 0 },
                        new Option() { Id = 2, Title = "Coffee", Votes = 0 },
                        new Option() { Id = 3, Title = "Cola", Votes = 0 },
                        new Option() { Id = 4, Title = "Beer", Votes = 0 }
                    }
                },
                new Poll()
                {
                    Id = 2,
                    Title = "Is this a cool question?",
                    Options = new List<Option>()
                    {
                        new Option() { Id = 1, Title = "Yes", Votes = 0 },
                        new Option() { Id = 2, Title = "No", Votes = 0 }
                    }
                }
            };
        }
    }
}
