using System;

namespace FoodAPICore.Dtos
{
    public class ProductDto
    {
        public string prod_name { get; set; }
        public string prod_desc { get; set; }
        public int prod_price { get; set; }
        public DateTime? update_at { get; set; }
    }
}
