using Microsoft.AspNetCore.Mvc;

namespace Controlls.Api.Controllers;

public class ControllController : Controller
{
    public IActionResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),
            "wwwroot", "index.html"), "text/HTML");
    }
}