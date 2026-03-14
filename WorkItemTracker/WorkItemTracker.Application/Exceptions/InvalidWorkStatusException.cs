namespace WorkItemTracker.Application.Exceptions
    {
    public class InvalidWorkStatusException : Exception
        {
        public InvalidWorkStatusException(string status)
            : base($"Invalid work status: {status}") { }
        }
    }