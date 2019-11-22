using System;
using System.Collections.Generic;

namespace FoodAPICore.Dtos
{
    public class FoodCreateDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public int Calories { get; set; }
        public DateTime Created { get; set; }

        public ICollection<IngredientDto> Ingredients { get; set; } = new List<IngredientDto>();
    }
}
