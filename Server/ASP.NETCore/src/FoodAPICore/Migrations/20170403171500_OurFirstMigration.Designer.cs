using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using FoodAPICore.Entities;

namespace FoodAPICore.Migrations
{
    [DbContext(typeof(FoodDbContext))]
    [Migration("20170403171500_OurFirstMigration")]
    partial class OurFirstMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("FoodAPICore.Models.FoodItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Calories");

                    b.Property<DateTime>("Created");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("FoodItems");
                });
        }
    }
}
