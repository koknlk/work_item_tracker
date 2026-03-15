using System.ComponentModel.DataAnnotations;

namespace WorkItemTracker.Application.DTOs
    {
    public class UpdateWorkItemDto
        {
        [Required]
        [StringLength(150, MinimumLength = 3)]
        public string Title { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        [Required]
        public string Status { get; set; }
        }
    }