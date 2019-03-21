using FoodAPICore.Entities;
using Microsoft.AspNetCore.Identity;
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
        public DbSet<Order> Orders { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<FoodItem> FoodItems { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<PeriodicElement> PeriodicElements { get; set; }      
        public DbSet<Note> Notes { get; set; }

        public DbSet<Product> Products { get; set; }

    }
}
