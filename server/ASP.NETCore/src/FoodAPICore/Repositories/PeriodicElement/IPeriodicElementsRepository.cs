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
        Task<PeriodicElement> GetGetPeriodicElementAsync(int id);

        Task<PeriodicElement> InsertPeriodicElementAsync(PeriodicElement element);
        Task<bool> UpdatePeriodicElementAsync(PeriodicElement element);
        //Task<bool> DeleteCustomerAsync(int id);
    }
}