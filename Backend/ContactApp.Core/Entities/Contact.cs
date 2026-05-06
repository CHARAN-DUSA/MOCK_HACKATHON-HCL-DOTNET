namespace ContactApp.Core.Entities;

public class Contact
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public bool Favorite { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
