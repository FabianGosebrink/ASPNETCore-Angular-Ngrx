using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodAPICore.Models
{
    public class FoodItem
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Calories { get; set; }
        public DateTime Created { get; set; }

        public List<Ingredient> Ingredients { get; set; }
    }
}
