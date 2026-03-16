using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkItemTracker.Application.DTOs;
using WorkItemTracker.Application.Services;
using WorkItemTracker.Domain.Entities;

namespace WorkItemTracker.API.Controllers
    {
    [Authorize]
    [ApiController]
    [Route("api/v1/workitems")]
    public class WorkItemsController : ControllerBase
        {
        private readonly WorkItemService _service;

        public WorkItemsController(WorkItemService service)
            {
            _service = service;
            }

        [HttpGet]
        public ActionResult<IEnumerable<WorkItem>> GetAll(
            [FromQuery] string status,
            [FromQuery] string sort)
            {
            var result = _service.GetAll(status, sort);
            return Ok(result);
            }

        [HttpGet("{id:guid}")]
        public ActionResult<WorkItem> GetById(Guid id)
            {
            return Ok(_service.GetById(id));
            }

        [HttpPost]
        public ActionResult<WorkItem> Create([FromBody] CreateWorkItemDto dto)
            {
            var item = _service.Create(dto);

            return CreatedAtAction(nameof(GetById),
                new { id = item.Id },
                item);
            }

        [HttpPut("{id:guid}")]
        public ActionResult<WorkItem> Update(Guid id, [FromBody] UpdateWorkItemDto dto)
            {
            return Ok(_service.Update(id, dto));
            }

        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
            {
            _service.Delete(id);

            return NoContent();
            }
        }
    }