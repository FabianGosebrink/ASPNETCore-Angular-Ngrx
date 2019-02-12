using FoodAPICore.Entities;

namespace FoodAPICore.Dtos
{
    public class CustomerUpdateDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public State State { get; set; }
    }
}
