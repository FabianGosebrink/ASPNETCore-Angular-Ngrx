using FoodAPICore.Entities;
using FoodAPICore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace FoodAPICore.Services
{
    public class EnsureDatabaseDataService : IEnsureDatabaseDataService
    {
        public async Task EnsureSeedData(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ILoggerFactory loggerFactory,
            FoodDbContext context)
        {
            context.Database.EnsureCreated();

            context.Users.RemoveRange(context.Users);
            context.SaveChanges();

            if (context.Users.Any())
            {
                return; // Db has been seeded.
            }

            // Creates Roles.
            await roleManager.CreateAsync(new IdentityRole("administrator"));
            await roleManager.CreateAsync(new IdentityRole("user"));

            context.FoodItems.Add(new FoodItem() { Calories = 1000, Name = "Lasagne", Created = DateTime.Now });
            context.FoodItems.Add(new FoodItem() { Calories = 1100, Name = "Hamburger", Created = DateTime.Now });
            context.FoodItems.Add(new FoodItem() { Calories = 1200, Name = "Spaghetti", Created = DateTime.Now });
            context.FoodItems.Add(new FoodItem() { Calories = 1300, Name = "Pizza", Created = DateTime.Now });
        }
    }
}
