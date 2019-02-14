using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodAPICore.Entities
{
    public class User
    {      
        public int id { get; set; }
        public DateTime birthDate { get; set; }
        public string name { get; set; }
        public string avatar { get; set; }
        public string bio { get; set; }

        public List<Note> Notes { get; set; }
    }
    public class Note
    {
        public int id { get; set; }
        public string title { get; set; }
        public DateTime date { get; set; }
    }
}

