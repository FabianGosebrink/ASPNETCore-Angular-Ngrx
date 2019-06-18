using Microsoft.AspNetCore.Mvc;

namespace FoodAPICore.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return new RedirectResult("~/swagger/");
        }
    }
}