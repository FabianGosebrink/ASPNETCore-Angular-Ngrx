using FoodAPICore.Entities;
using FoodAPICore.Models;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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

            // Adds Roles to Role Claims.
            var adminRole = await roleManager.FindByNameAsync("administrator");
            var userRole = await roleManager.FindByNameAsync("user");
            await roleManager.AddClaimAsync(adminRole, new Claim(JwtClaimTypes.Role, "administrator"));
            await roleManager.AddClaimAsync(userRole, new Claim(JwtClaimTypes.Role, "user"));

            // Seeds an admin user.
            var user = new IdentityUser
            {
                AccessFailedCount = 0,
                Email = "admin@gmail.com",
                EmailConfirmed = false,
                LockoutEnabled = true,
                NormalizedEmail = "ADMIN@GMAIL.COM",
                NormalizedUserName = "ADMIN@GMAIL.COM",
                TwoFactorEnabled = false,
                UserName = "admin"
            };

            var result = await userManager.CreateAsync(user, "admin");

            if (result.Succeeded)
            {
                var adminUser = await userManager.FindByNameAsync(user.UserName);
                // Assigns the 'administrator' role.
                await userManager.AddToRoleAsync(adminUser, "administrator");
                // Assigns claims.
                var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.Name, value: user.UserName),
                    new Claim(type: JwtClaimTypes.Email, value: user.Email),
                };
                await userManager.AddClaimsAsync(adminUser, claims);
            }

            context.FoodItems.Add(new FoodItem() { Calories = 1000, Name = "Lasagne", Created = DateTime.Now });
            context.FoodItems.Add(new FoodItem() { Calories = 1100, Name = "Hamburger", Created = DateTime.Now });
            context.FoodItems.Add(new FoodItem() { Calories = 1200, Name = "Spaghetti", Created = DateTime.Now });
            context.FoodItems.Add(new FoodItem() { Calories = 1300, Name = "Pizza", Created = DateTime.Now });
        }
    }
}
