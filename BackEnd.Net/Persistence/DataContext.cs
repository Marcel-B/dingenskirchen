using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Buchung> Buchungen { get; set; }
    public DbSet<Tag> Tags { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Tag>().HasData(new[]
        {
            new Tag
            {
                Created = DateTimeOffset.Now,
                Id = Guid.Parse("686A7E4C-6FD1-4D8B-A152-956E01F20921"),
                Name = "App",
            },
            new Tag
            {
                Created = DateTimeOffset.Now,
                Id = Guid.Parse("6DFB2904-914B-47F2-8C63-D04F402E1842"),
                Name = "Wohnmobil",
            },
            new Tag
            {
                Created = DateTimeOffset.Now,
                Id = Guid.Parse("5AA5D9F3-8CF4-4A77-B072-5DB7E78C8DB1"),
                Name = "Spende",
            },
            new Tag
            {
                Created = DateTimeOffset.Now,
                Id = Guid.Parse("59CA7D7F-CF79-4F54-83B8-4A7B44DE1995"),
                Name = "Versicherung",
            }
        });
    }
}