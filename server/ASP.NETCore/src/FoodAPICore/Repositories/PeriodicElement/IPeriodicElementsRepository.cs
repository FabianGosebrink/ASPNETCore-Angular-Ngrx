using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodAPICore.Entities;


namespace FoodAPICore.Repositories
{
    public interface IPeriodicElementsRepository
    {     
        Task<List<PeriodicElement>> GetPeriodicElementsAsync();
        //       Task<PagingResult<Customer>> GetCustomersPageAsync(int skip, int take);
        //Task<Customer> GetCustomerAsync(int id);

        Task<PeriodicElement> InsertPeriodicElementAsync(PeriodicElement user);
        //Task<bool> UpdateCustomerAsync(Customer customer);
        //Task<bool> DeleteCustomerAsync(int id);
    }
}