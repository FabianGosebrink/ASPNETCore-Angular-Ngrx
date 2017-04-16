using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodAPICore.ViewModels
{
    public class IngredientUpdateViewModel
    {
        public int Quantity { get; set; }

        public int Weight { get; set; }

        public string Description { get; set; }
    }
}
