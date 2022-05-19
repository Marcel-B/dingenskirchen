var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();
var options = new DefaultFilesOptions();

options.DefaultFileNames.Clear();
options.DefaultFileNames.Add("index.html");

app.UseDefaultFiles(options);
app.UseStaticFiles();
app.UseDefaultFiles();

app.Run();