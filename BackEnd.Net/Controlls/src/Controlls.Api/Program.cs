var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(o => { o.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin(); });
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();

app.MapFallbackToController("Index", "Controll");
app.MapControllers();

app.Run();