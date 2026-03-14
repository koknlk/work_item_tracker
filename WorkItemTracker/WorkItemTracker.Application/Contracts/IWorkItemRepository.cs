using WorkItemTracker.Domain.Entities;

namespace WorkItemTracker.Application.Contracts
    {
    public interface IWorkItemRepository
        {
        IEnumerable<WorkItem> GetAll();

        WorkItem GetById(Guid id);

        WorkItem Add(WorkItem item);

        void Update(WorkItem item);

        void Delete(Guid id);
        }
    }