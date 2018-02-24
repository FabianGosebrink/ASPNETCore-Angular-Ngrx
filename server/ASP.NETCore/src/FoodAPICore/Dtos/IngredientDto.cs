using System;

namespace FoodAPICore.Dtos
{
    public class IngredientDto
    {
        public Guid Id { get; set; }

        public int Quantity { get; set; }

        public int Weight { get; set; }

        public string Description { get; set; }

        public FoodItemDto FoodItem { get; set; }
    }
}
