namespace PollAPI
{
    public class Poll
    {
        public int Id { get; set; }
              
        public string? Title { get; set; }

        public List<Option> Options { get; set; }
    }
}
