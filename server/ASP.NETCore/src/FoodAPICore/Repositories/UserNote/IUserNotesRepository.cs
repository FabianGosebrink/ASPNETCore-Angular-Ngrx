using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodAPICore.Entities;


namespace FoodAPICore.Repositories
{
    public interface IUserNotesRepository
    {     
        Task<List<User>> GetUserNotesAsync();
        //       Task<PagingResult<Customer>> GetCustomersPageAsync(int skip, int take);
        //Task<Customer> GetCustomerAsync(int id);

        Task<User> InsertUserAsync(User user);
        //Task<bool> UpdateCustomerAsync(Customer customer);
        //Task<bool> DeleteCustomerAsync(int id);
    }
}