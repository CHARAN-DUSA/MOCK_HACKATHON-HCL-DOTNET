using ContactApp.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactApp.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Contact> Contacts => Set<Contact>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Contact>(e =>
        {
            e.HasKey(c => c.Id);
            e.Property(c => c.FirstName).IsRequired().HasMaxLength(50);
            e.Property(c => c.LastName).HasMaxLength(50);
            e.Property(c => c.Email).HasMaxLength(100);
            e.Property(c => c.PhoneNumber).HasMaxLength(20);
            e.Property(c => c.Company).HasMaxLength(100);
            e.Property(c => c.Address).HasMaxLength(250);
        });
    }
}
