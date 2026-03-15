using WorkItemTracker.Domain.Enums;

namespace WorkItemTracker.Domain.Entities
    {
    public class WorkItem
        {
        public Guid Id { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public WorkStatus Status { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public WorkItem(string title, string description)
            {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title cannot be empty");

            Id = Guid.NewGuid();
            Title = title;
            Description = description;
            Status = WorkStatus.New;
            CreatedAt = DateTime.UtcNow;
            }

        public void Update(string title, string description, WorkStatus status)
            {
            Title = title;
            Description = description;
            Status = status;
            }
        }
    }