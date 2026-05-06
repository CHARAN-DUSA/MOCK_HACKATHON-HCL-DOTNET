using ContactApp.Core.Entities;
using ContactApp.Core.Interfaces;
using ContactApp.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Infrastructure.Repositories;

public class ContactRepository : IContactRepository
{
    private readonly AppDbContext _db;

    public ContactRepository(AppDbContext db) => _db = db;

    public async Task<IEnumerable<Contact>> GetAllAsync(string? search = null)
    {
        var query = _db.Contacts.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            search = search.ToLower();
            query = query.Where(c =>
                c.FirstName.ToLower().Contains(search) ||
                c.LastName.ToLower().Contains(search) ||
                c.Email.ToLower().Contains(search) ||
                c.PhoneNumber.Contains(search));
        }

        return await query.OrderBy(c => c.FirstName).ToListAsync();
    }

    public async Task<Contact?> GetByIdAsync(int id) =>
        await _db.Contacts.FindAsync(id);

    public async Task<Contact> CreateAsync(Contact contact)
    {
        _db.Contacts.Add(contact);
        await _db.SaveChangesAsync();
        return contact;
    }

    public async Task<Contact?> UpdateAsync(int id, Contact updated)
    {
        var contact = await _db.Contacts.FindAsync(id);
        if (contact == null) return null;

        contact.FirstName = updated.FirstName;
        contact.LastName = updated.LastName;
        contact.Email = updated.Email;
        contact.PhoneNumber = updated.PhoneNumber;
        contact.Company = updated.Company;
        contact.Address = updated.Address;
        contact.Favorite = updated.Favorite;

        await _db.SaveChangesAsync();
        return contact;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var contact = await _db.Contacts.FindAsync(id);
        if (contact == null) return false;

        _db.Contacts.Remove(contact);
        await _db.SaveChangesAsync();
        return true;
    }
}
