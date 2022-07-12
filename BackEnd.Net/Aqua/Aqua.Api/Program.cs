using com.marcelbenders.Aqua.Api.ErrorHandler;
using com.marcelbenders.Aqua.Api.Extensions;
using com.marcelbenders.Aqua.Application;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.MongoDb;
using com.marcelbenders.Aqua.Persistence;
using com.marcelbenders.Aqua.SqlServer;
using com.marcelbenders.Aqua.SqlServer.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAquaApplication();
builder.Services.AddMongoDb();
builder.Services.AddIdentityServices(builder.Configuration);

var configuration = builder.Configuration.GetConnectionString("SqlServer");
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(configuration));
builder.Services.AddScoped<IAquariumRepository, AquariumRepository>();
builder.Services.AddScoped<INotizRepository, NotizRepository>();

var app = builder.Build();

var scope = app.Services.CreateScope();

var context = scope.ServiceProvider.GetRequiredService<DataContext>();
context.Database.Migrate();

/*var dbExsists = context.Database.EnsureCreated();
if (dbExsists)
{
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}*/

var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
await SeedData.Seed(context, userManager);
scope.Dispose();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}

app.UseSwagger();
app.UseSwaggerUI();
app.UseErrorHandler();
app.UseCors(o =>
{
    o.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:9000", "http://localhost:3000",
        "http://localhost:3007", "http://192.168.2.103:9005");
});

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();