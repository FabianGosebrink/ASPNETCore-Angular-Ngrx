using System;
using System.Collections.Generic;

namespace FoodAPICore.Dtos
{
  
    public class UserNotesDto
    {
        public int id { get; set; }
        public DateTime birthDate { get; set; }
        public string name { get; set; }
        public string avatar { get; set; }
        public string bio { get; set; }

        public List<NoteDto> Notes { get; set; }
    }
    public class NoteDto
    {
        public int id { get; set; }
        public string title { get; set; }
        public DateTime date { get; set; }
    }
}
