using FoodAPICore.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodAPICore.Repositories
{
    public class ProductRepository : IProductRepository
    {
        FoodDbContext _foodDbContext;

        public ProductRepository(FoodDbContext foodDbContext)
        {
            _foodDbContext = foodDbContext;
        }
        public void Add(Product item)
        {
            _foodDbContext.Products.Add(item);
        }
        public int Count()
        {
            return _foodDbContext.Products.Count();
        }

        public void Delete(int id)
        {
            Product toRemove = GetSingle(id);
            _foodDbContext.Products.Remove(toRemove);
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _foodDbContext.Products.ToListAsync();
        }

        public Product GetSingle(int id)
        {
            return _foodDbContext.Products.FirstOrDefault(x => x.Id == id);
        }

        public bool Save()
        {
            return (_foodDbContext.SaveChanges() >= 0);
        }

        public void Update(Product item)
        {
            _foodDbContext.Products.Update(item);
        }

    }
}
