using FoodAPICore.Models;
using Microsoft.EntityFrameworkCore;

namespace FoodAPICore.Entities
{
    public class FoodDbContext : DbContext
    {
        public FoodDbContext(DbContextOptions<FoodDbContext> options)
           : base(options)
        {

        }

        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
    }
}
