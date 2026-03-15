using WorkItemTracker.Application.Contracts;
using WorkItemTracker.Application.DTOs;
using WorkItemTracker.Application.Exceptions;
using WorkItemTracker.Application.Mappers;
using WorkItemTracker.Application.Services.Filters;
using WorkItemTracker.Domain.Entities;
using WorkItemTracker.Domain.Enums;

namespace WorkItemTracker.Application.Services
    {
    public class WorkItemService
        {
        private readonly IWorkItemRepository _repository;

        public WorkItemService(IWorkItemRepository repository)
            {
            _repository = repository;
            }

        public IEnumerable<WorkItem> GetAll(string status, string sort)
            {
            var items = _repository.GetAll();

            return WorkItemFilter.Apply(items, status, sort);
            }

        public WorkItem GetById(Guid id)
            {
            var item = _repository.GetById(id);

            if (item == null)
                throw new WorkItemNotFoundException(id);

            return item;
            }

        public WorkItemSummaryDto GetSummary(Guid id)
            {
            var item = GetById(id);

            return WorkItemMapper.ToSummaryDto(item);
            }

        public WorkItem Create(CreateWorkItemDto dto)
            {
            var title = dto.Title.Trim();
            var description = dto.Description?.Trim();

            var item = new WorkItem(title, description);

            return _repository.Add(item);
            }

        public WorkItem Update(Guid id, UpdateWorkItemDto dto)
            {
            var item = GetById(id);

            if (!Enum.TryParse<WorkStatus>(dto.Status, true, out var parsedStatus))
                throw new ArgumentException("Invalid status");

            item.Update(
                dto.Title.Trim(),
                dto.Description?.Trim(),
                parsedStatus
            );

            _repository.Update(item);

            return item;
            }

        public void Delete(Guid id)
            {
            var item = GetById(id);

            _repository.Delete(item.Id);
            }
        }
    }