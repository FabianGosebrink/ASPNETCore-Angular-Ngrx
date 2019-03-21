using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FoodAPICore.Entities
{
    public class PeriodicElement
    {
        public int Id { get; set; }
        public int position { get; set; }
        [Required]
        [StringLength(20)]
        public string name { get; set; }
        public double weight  { get; set; }
        [Required]
        [StringLength(10)]
        public string symbol { get; set; }
    }
}
