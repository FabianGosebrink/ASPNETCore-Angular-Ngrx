using System;
using System.Collections.Generic;

namespace FoodAPICore.Dtos
{
  
    public class PeriodicElementDto
    {
        public int id { get; set; }
        public int position { get; set; }
        public string name { get; set; }
        public double weight { get; set; }
        public string symbol { get; set; }
    }
}
