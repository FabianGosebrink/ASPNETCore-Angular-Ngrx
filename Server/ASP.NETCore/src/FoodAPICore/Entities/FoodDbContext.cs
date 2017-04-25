using FoodAPICore.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FoodAPICore.Entities
{
    public class FoodDbContext : IdentityDbContext<IdentityUser>
    {
        public FoodDbContext(DbContextOptions<FoodDbContext> options)
           : base(options)
        {

        }

        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
    }
}
