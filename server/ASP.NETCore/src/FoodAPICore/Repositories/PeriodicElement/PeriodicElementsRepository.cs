using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.Extensions.Logging;
using FoodAPICore.Repositories;
using FoodAPICore.Entities;
using AutoMapper;
using FoodAPICore.Dtos;

namespace FoodAPICore.Repositoriess
{
    public class PeriodicElementsRepository : IPeriodicElementsRepository
    {
        private readonly FoodDbContext _Context;
        private readonly ILogger _Logger;

        public PeriodicElementsRepository(FoodDbContext context, ILoggerFactory loggerFactory) {
          _Context = context;
          _Logger = loggerFactory.CreateLogger("PeriodicElementsRepository");
        }

        public Task<PeriodicElement> GetGetPeriodicElementAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<PeriodicElement>> GetPeriodicElementsAsync()
        {
            return await _Context.PeriodicElements.ToListAsync();
        }
        public PeriodicElement GetSingle(int id)
        {
            return _Context.PeriodicElements.Single(x => x.Id == id);
        }
      

        //public async Task<PagingResult<Customer>> GetCustomersPageAsync(int skip, int take)
        //{
        //    var totalRecords = await _Context.Customers.CountAsync();
        //    var customers = await _Context.Customers
        //                         .OrderBy(c => c.LastName)
        //                         .Include(c => c.State)
        //                         .Include(c => c.Orders)
        //                         .Skip(skip)
        //                         .Take(take)
        //                         .ToListAsync();
        //    return new PagingResult<Customer>(customers, totalRecords);
        //}
        public async Task<PeriodicElement> InsertPeriodicElementAsync(PeriodicElement element)
        {
            _Context.Add(element);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (System.Exception exp)
            {
                _Logger.LogError($"Error in {nameof(InsertPeriodicElementAsync)}: " + exp.Message);
            }

            return element;
        }
      
        public async Task<bool> UpdatePeriodicElementAsync(PeriodicElement element)
        {
            try
            {
                var periodicElement = _Context.PeriodicElements.FirstOrDefault(p => p.Id == element.Id);
                _Context.Entry(periodicElement).CurrentValues.SetValues(element);
                return (await _Context.SaveChangesAsync() > 0 ? true : false);
            }
            catch (Exception exp)
            {
                _Logger.LogError($"Error in {nameof(UpdatePeriodicElementAsync)}: " + exp.Message);
            }
            return false;
        }
        
        //public async Task<bool> DeleteCustomerAsync(int id)
        //{
        //    //Extra hop to the database but keeps it nice and simple for this demo
        //    //Including orders since there's a foreign-key constraint and we need
        //    //to remove the orders in addition to the customer
        //    var customer = await _Context.Customers
        //                        .Include(c => c.Orders)
        //                        .SingleOrDefaultAsync(c => c.Id == id);
        //    _Context.Remove(customer);
        //    try
        //    {
        //      return (await _Context.SaveChangesAsync() > 0 ? true : false);
        //    }
        //    catch (System.Exception exp)
        //    {
        //       _Logger.LogError($"Error in {nameof(DeleteCustomerAsync)}: " + exp.Message);
        //    }
        //    return false;
        //}

    }
}