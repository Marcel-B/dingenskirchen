﻿using com.marcelbenders.Aqua.Domain.Sql;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace com.marcelbenders.Aqua.SqlServer;

public class DataContext : IdentityDbContext<AppUser>
{
    public DbSet<Aquarium> Aquarien { get; set; }
    public DbSet<Duengung> Duengungen { get; set; }
    public DbSet<Fisch> Fische { get; set; }
    public DbSet<Messung> Messungen { get; set; }
    public DbSet<Notiz> Notizen { get; set; }
    public DbSet<Tag> Tags { get; set; }

    public DataContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder
            .Entity<Fisch>()
            .Property(e => e.Temperatur)
            .HasConversion(
                v => v.ToString(),
                v => Bereich.Instance(v));

        builder
            .Entity<Fisch>()
            .Property(e => e.Ph)
            .HasConversion(
                v => v.ToString(),
                v => Bereich.Instance(v));

        builder
            .Entity<Fisch>()
            .Property(e => e.Kh)
            .HasConversion(
                v => v.ToString(),
                v => Bereich.Instance(v));

        builder
            .Entity<Fisch>()
            .Property(e => e.Gh)
            .HasConversion(
                v => v.ToString(),
                v => Bereich.Instance(v));

        builder
            .Entity<Duengung>()
            .HasOne(e => e.AppUser)
            .WithMany(e => e.Duengungen)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .Entity<Messung>()
            .HasOne(e => e.AppUser)
            .WithMany(e => e.Messungen)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .Entity<Notiz>()
            .HasOne(e => e.AppUser)
            .WithMany(e => e.Notizen)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .Entity<Aquarium>()
            .HasOne(e => e.AppUser)
            .WithMany(e => e.Aquarien)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .Entity<Fisch>()
            .HasOne(e => e.AppUser)
            .WithMany(e => e.Fische)
            .OnDelete(DeleteBehavior.NoAction);
    }
}