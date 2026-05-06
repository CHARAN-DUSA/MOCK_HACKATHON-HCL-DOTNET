using ContactApp.Core.Entities;

namespace ContactApp.Core.Interfaces;

public interface IContactRepository
{
    Task<IEnumerable<Contact>> GetAllAsync(string? search = null);
    Task<Contact?> GetByIdAsync(int id);
    Task<Contact> CreateAsync(Contact contact);
    Task<Contact?> UpdateAsync(int id, Contact contact);
    Task<bool> DeleteAsync(int id);
}
