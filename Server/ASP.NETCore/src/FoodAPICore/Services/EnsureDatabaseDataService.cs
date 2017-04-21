using FoodAPICore.Entities;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
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
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger _logger;
        private readonly FoodDbContext _context;

        public EnsureDatabaseDataService(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ILoggerFactory loggerFactory,
            FoodDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = loggerFactory.CreateLogger<EnsureDatabaseDataService>();
            _context = context;
        }

        public async Task EnsureSeedData()
        {
            _context.Database.EnsureCreated();

            _context.Users.RemoveRange(_context.Users);
            _context.SaveChanges();

            if (_context.Users.Any())
            {
                return; // Db has been seeded.
            }

            // Creates Roles.
            await _roleManager.CreateAsync(new IdentityRole("administrator"));
            await _roleManager.CreateAsync(new IdentityRole("user"));

            // Adds Roles to Role Claims.
            var adminRole = await _roleManager.FindByNameAsync("administrator");
            var userRole = await _roleManager.FindByNameAsync("user");
            await _roleManager.AddClaimAsync(adminRole, new Claim(JwtClaimTypes.Role, "administrator"));
            await _roleManager.AddClaimAsync(userRole, new Claim(JwtClaimTypes.Role, "user"));

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

            var result = await _userManager.CreateAsync(user, "admin");

            if (result.Succeeded)
            {
                var adminUser = await _userManager.FindByNameAsync(user.UserName);
                // Assigns the 'administrator' role.
                await _userManager.AddToRoleAsync(adminUser, "administrator");
                // Assigns claims.
                var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.Name, value: user.UserName),
                    new Claim(type: JwtClaimTypes.Email, value: user.Email),
                };
                await _userManager.AddClaimsAsync(adminUser, claims);
            }
        }
    }
}
