namespace WorkItemTracker.Application.Exceptions
    {
    public class WorkItemNotFoundException : Exception
        {
        public WorkItemNotFoundException(Guid id)
            : base($"Work item with Id {id} was not found") { }
        }
    }