using FoodAPICore.Entities;
using FoodAPICore.ViewModels;
using IdentityModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FoodAPICore.Controllers
{
    /// <summary>
    /// Identity Web API controller.
    /// </summary>
    [Route("api/[controller]")]
    [Authorize(Policy = "Manage Accounts")] // Authorization policy for this API.
    public class IdentityController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ILogger _logger;
        private readonly FoodDbContext _context;

        public IdentityController(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<IdentityUser> signInManager,
            ILoggerFactory loggerFactory,
            FoodDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _logger = loggerFactory.CreateLogger<IdentityController>();
            _context = context;
        }

        /// <summary>
        /// Gets all the users.
        /// </summary>
        /// <returns>Returns all the users</returns>
        // GET api/identity/GetAll
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var role = await _roleManager.FindByNameAsync("user");
            var users = await _userManager.GetUsersInRoleAsync(role.Name);

            return Ok(users);
        }

        /// <summary>
        /// Deletes a user.
        /// </summary>
        /// <returns>IdentityResult</returns>
        // POST: api/identity/Delete
        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody]string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            var result = await _userManager.DeleteAsync(user);

            return Ok(result);
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody]UserCreateViewModel model)
        {
            var user = new IdentityUser
            {
                AccessFailedCount = 0,
                Email = model.Email,
                EmailConfirmed = false,
                LockoutEnabled = true,
                NormalizedEmail = model.Email.ToUpper(),
                NormalizedUserName = model.Email.ToUpper(),
                TwoFactorEnabled = false,
                UserName = model.Username
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await AddToRole(model.Username, "user");
                await AddClaims(model.Username);
            }

            return Ok(result);
        }

        private async Task AddToRole(string userName, string roleName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            await _userManager.AddToRoleAsync(user, roleName);
        }

        private async Task AddClaims(string userName)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var claims = new List<Claim> {
                new Claim(type: JwtClaimTypes.Name, value: user.UserName),
                new Claim(type: JwtClaimTypes.Email, value: user.Email)
            };
            await _userManager.AddClaimsAsync(user, claims);
        }
    }
}
