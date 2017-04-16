using System;

namespace FoodAPICore.ViewModels
{
    public class IngredientViewModel
    {
        public Guid Id { get; set; }

        public int Quantity { get; set; }

        public int Weight { get; set; }

        public string Description { get; set; }

        public FoodItemViewModel FoodItem { get; set; }
    }
}
