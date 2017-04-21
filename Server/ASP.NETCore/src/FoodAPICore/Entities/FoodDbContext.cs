using FoodAPICore.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodAPICore.Entities
{
    public class FoodDbContext : IdentityDbContext<IdentityUser>
    {
        public FoodDbContext(DbContextOptions<FoodDbContext> options)
           : base(options)
        {

        }

        public DbSet<FoodItem> FoodItems { get; set; }

    }
}
