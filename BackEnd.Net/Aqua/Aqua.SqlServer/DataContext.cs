using com.marcelbenders.Aqua.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace com.marcelbenders.Aqua.SqlServer;

public class DataContext : IdentityDbContext<AppUser>
{
    public DataContext(DbContextOptions options): base(options){}
}