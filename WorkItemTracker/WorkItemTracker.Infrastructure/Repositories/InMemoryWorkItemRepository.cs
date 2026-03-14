using WorkItemTracker.Domain.Entities;
using WorkItemTracker.Application.Contracts;

namespace WorkItemTracker.Infrastructure.Repositories
    {
    public class InMemoryWorkItemRepository : IWorkItemRepository
        {
        private readonly List<WorkItem> _items = new();
        private readonly object _lock = new();

        public IEnumerable<WorkItem> GetAll()
            {
            lock (_lock)
                {
                return _items.ToList();
                }
            }

        public WorkItem GetById(Guid id)
            {
            lock (_lock)
                {
                return _items.FirstOrDefault(x => x.Id == id);
                }
            }

        public WorkItem Add(WorkItem item)
            {
            lock (_lock)
                {
                _items.Add(item);
                }
            return item;
            }

        public void Update(WorkItem item)
            {
            lock (_lock)
                {
                var index = _items.FindIndex(x => x.Id == item.Id);
                if (index != -1)
                    _items[index] = item;
                }
            }

        public void Delete(Guid id)
            {
            lock (_lock)
                {
                var existing = _items.FirstOrDefault(x => x.Id == id);
                if (existing != null)
                    _items.Remove(existing);
                }
            }
        }
    }