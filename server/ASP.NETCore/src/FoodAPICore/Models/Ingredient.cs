using System;
using System.ComponentModel.DataAnnotations;

namespace FoodAPICore.Models
{
    public class Ingredient
    {
        [Key]
        public Guid Id { get; set; }

        public int Quantity { get; set; }

        public int Weight { get; set; }

        public string Description { get; set; }

        public FoodItem FoodItem { get; set; }
    }
}
