using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodAPICore.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string prod_name { get; set; }
  
        public string prod_desc { get; set; }

        public int prod_price { get; set; }
        public DateTime updated_at { get; set; }
    }
}
