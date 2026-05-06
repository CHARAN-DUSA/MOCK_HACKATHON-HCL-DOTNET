using ContactApp.Core.DTOs;
using ContactApp.Core.Entities;
using ContactApp.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ContactApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactsController : ControllerBase
{
    private readonly IContactRepository _repo;

    public ContactsController(IContactRepository repo) => _repo = repo;

    // GET /api/contacts?search=
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search)
    {
        var contacts = await _repo.GetAllAsync(search);
        var result = contacts.Select(MapToDto);
        return Ok(result);
    }

    // GET /api/contacts/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var contact = await _repo.GetByIdAsync(id);
        if (contact == null) return NotFound(new { message = "Contact not found." });
        return Ok(MapToDto(contact));
    }

    // POST /api/contacts
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateContactDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var contact = MapToEntity(dto);
        var created = await _repo.CreateAsync(contact);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, MapToDto(created));
    }

    // PUT /api/contacts/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateContactDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var updated = await _repo.UpdateAsync(id, MapToEntity(dto));
        if (updated == null) return NotFound(new { message = "Contact not found." });

        return Ok(MapToDto(updated));
    }

    // DELETE /api/contacts/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _repo.DeleteAsync(id);
        if (!deleted) return NotFound(new { message = "Contact not found." });

        return NoContent();
    }

    // --- Helpers ---
    private static ContactResponseDto MapToDto(Contact c) => new()
    {
        Id = c.Id,
        FirstName = c.FirstName,
        LastName = c.LastName,
        Email = c.Email,
        PhoneNumber = c.PhoneNumber,
        Company = c.Company,
        Address = c.Address,
        Favorite = c.Favorite,
        CreatedAt = c.CreatedAt
    };

    private static Contact MapToEntity(CreateContactDto dto) => new()
    {
        FirstName = dto.FirstName,
        LastName = dto.LastName,
        Email = dto.Email,
        PhoneNumber = dto.PhoneNumber,
        Company = dto.Company,
        Address = dto.Address,
        Favorite = dto.Favorite
    };
}
