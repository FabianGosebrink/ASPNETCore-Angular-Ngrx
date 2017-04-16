using System;

namespace FoodAPICore.ViewModels
{
    public class FoodItemViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Calories { get; set; }
        public DateTime Created { get; set; }
    }
}
