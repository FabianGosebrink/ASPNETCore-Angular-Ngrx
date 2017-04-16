using FoodAPICore.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodAPICore.Entities
{
    public class FoodDbContext : DbContext
    {
        public FoodDbContext(DbContextOptions<FoodDbContext> options)
           : base(options)
        {

        }

        public DbSet<FoodItem> FoodItems { get; set; }

    }
}
