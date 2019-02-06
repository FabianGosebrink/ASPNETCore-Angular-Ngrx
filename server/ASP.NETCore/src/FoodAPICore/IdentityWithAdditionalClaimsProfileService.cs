using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;
using IdentityServer4;

namespace FoodAPICore
{
    public class IdentityWithAdditionalClaimsProfileService : IProfileService
    {
        private readonly IUserClaimsPrincipalFactory<IdentityUser> _claimsFactory;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public IdentityWithAdditionalClaimsProfileService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, IUserClaimsPrincipalFactory<IdentityUser> claimsFactory)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _claimsFactory = claimsFactory;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var sub = context.Subject.GetSubjectId();

            var user = await _userManager.FindByIdAsync(sub);
            var principal = await _claimsFactory.CreateAsync(user);

            var claims = principal.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            claims.Add(new Claim(JwtClaimTypes.GivenName, user.UserName));

            var adminRole = await _roleManager.FindByNameAsync("administrator");
            var userRole = await _roleManager.FindByNameAsync("user");

            //claims.Add(new Claim(JwtClaimTypes.Role, "administrator"));
            //claims.Add(new Claim(JwtClaimTypes.Role, "user"));

            //if (user.IsAdmin)
            //{
            //    claims.Add(new Claim(JwtClaimTypes.Role, "admin"));
            //}


            claims.Add(new Claim(IdentityServerConstants.StandardScopes.Email, user.Email));
            claims.Add(new Claim("name", user.Email));

            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var sub = context.Subject.GetSubjectId();
            var user = await _userManager.FindByIdAsync(sub);
            context.IsActive = user != null;
        }
    }
}