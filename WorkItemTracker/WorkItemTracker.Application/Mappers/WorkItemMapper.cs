using WorkItemTracker.Application.DTOs;
using WorkItemTracker.Domain.Entities;

namespace WorkItemTracker.Application.Mappers
    {
    public class WorkItemMapper
        {
        public static WorkItemSummaryDto ToSummaryDto(WorkItem item)
            => new WorkItemSummaryDto
                {
                Id = item.Id,
                Title = item.Title,
                Status = item.Status.ToString()
                };
        }
    }