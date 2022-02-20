using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Buchung> Buchungen { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Buchung>()
                .Property(c => c.Kategorie)
                .HasConversion<int>();
            
            modelBuilder.Entity<Buchung>()
                .Property(c => c.Intervall)
                .HasConversion<int>();

            base.OnModelCreating(modelBuilder);
        }
    }
}