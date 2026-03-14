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
        private readonly IWorkItemRepository _repo;

        public WorkItemService(IWorkItemRepository repo)
            => _repo = repo;

        public IEnumerable<WorkItem> GetAll(string status = null, string sort = null)
            {
            var items = _repo.GetAll();
            return WorkItemFilter.Apply(items, status, sort);
            }

        public WorkItem GetById(Guid id)
            {
            var item = _repo.GetById(id);
            if (item == null) throw new WorkItemNotFoundException(id);
            return item;
            }

        public WorkItemSummaryDto GetSummary(Guid id)
            => WorkItemMapper.ToSummaryDto(GetById(id));

        public WorkItem Create(CreateWorkItemDto dto)
            {
            if (!Enum.TryParse<WorkStatus>(dto.Status, out var status))
                throw new InvalidWorkStatusException(dto.Status);

            var workItem = new WorkItem
                {
                Title = dto.Title,
                Description = dto.Description,
                Status = status
                };

            return _repo.Add(workItem);
            }

        public WorkItem Update(Guid id, UpdateWorkItemDto dto)
            {
            var existing = GetById(id);

            if (!Enum.TryParse<WorkStatus>(dto.Status, out var status))
                throw new InvalidWorkStatusException(dto.Status);

            existing.Title = dto.Title;
            existing.Description = dto.Description;
            existing.Status = status;

            _repo.Update(existing);
            return existing;
            }

        public void Delete(Guid id)
            {
            var existing = GetById(id);
            _repo.Delete(id);
            }
        }
    }