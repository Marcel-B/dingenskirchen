using com.marcelbenders.Aqua.Api.ErrorHandler;
using com.marcelbenders.Aqua.Application;
using com.marcelbenders.Aqua.MongoDb;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAquaApplication();
builder.Services.AddMongoDb();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseErrorHandler();

app.UseCors(o => { o.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3007"); });

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();