using WorkItemTracker.Domain.Entities;
using WorkItemTracker.Domain.Enums;

namespace WorkItemTracker.Application.Services.Filters
    {
    public class WorkItemFilter
        {
        public static IEnumerable<WorkItem> Apply(IEnumerable<WorkItem> items, string status, string sort)
            {
            if (!string.IsNullOrWhiteSpace(status) && Enum.TryParse<WorkStatus>(status, out var s))
                items = items.Where(x => x.Status == s);

            items = sort switch
                {
                    "date" => items.OrderByDescending(x => x.CreationDate),
                    _ => items
                    };

            return items;
            }
        }
    }