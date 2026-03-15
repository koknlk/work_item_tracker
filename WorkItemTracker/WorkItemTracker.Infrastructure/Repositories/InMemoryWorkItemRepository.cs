using WorkItemTracker.Application.Contracts;
using WorkItemTracker.Domain.Entities;

namespace WorkItemTracker.Infrastructure.Repositories
    {
    public class InMemoryWorkItemRepository : IWorkItemRepository
        {
        private readonly List<WorkItem> _items = new();

        public IEnumerable<WorkItem> GetAll() => _items;

        public WorkItem GetById(Guid id)
            => _items.FirstOrDefault(x => x.Id == id);

        public WorkItem Add(WorkItem item)
            {
            _items.Add(item);
            return item;
            }

        public void Update(WorkItem item)
            {
            var index = _items.FindIndex(x => x.Id == item.Id);

            if (index != -1)
                _items[index] = item;
            }

        public void Delete(Guid id)
            {
            var item = GetById(id);

            if (item != null)
                _items.Remove(item);
            }
        }
    }