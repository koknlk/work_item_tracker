using WorkItemTracker.Domain.Entities;
using WorkItemTracker.Domain.Enums;

namespace WorkItemTracker.Application.Services.Filters
    {
    public static class WorkItemFilter
        {
        public static IEnumerable<WorkItem> Apply(
            IEnumerable<WorkItem> items,
            string status,
            string sort)
            {
            if (!string.IsNullOrWhiteSpace(status) &&
                Enum.TryParse<WorkStatus>(status, true, out var parsedStatus))
                {
                items = items.Where(x => x.Status == parsedStatus);
                }

            items = sort?.ToLower() switch
                {
                    "date" => items.OrderByDescending(x => x.CreatedAt),
                    _ => items
                    };

            return items;
            }
        }
    }