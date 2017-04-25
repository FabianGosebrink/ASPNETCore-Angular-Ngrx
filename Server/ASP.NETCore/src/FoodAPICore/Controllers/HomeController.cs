using Microsoft.AspNetCore.Mvc;

namespace FoodAPICore.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return new RedirectResult("~/swagger/");
        }
    }
}
