using System;
using System.Collections.Generic;

namespace FoodAPICore.Models
{
    public class FoodItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Calories { get; set; }
        public DateTime Created { get; set; }

        public List<Ingredient> Ingredients { get; set; }
    }
}
