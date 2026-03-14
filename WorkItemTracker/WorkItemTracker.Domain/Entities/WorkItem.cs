using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkItemTracker.Domain.Enums;

namespace WorkItemTracker.Domain.Entities
    {
    public class WorkItem
        {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Title { get; set; }
        public string Description { get; set; }
        public WorkStatus Status { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        }
    }