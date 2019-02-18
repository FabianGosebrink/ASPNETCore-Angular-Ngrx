using FoodAPICore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodAPICore.Repositories
{
    public interface IProductRepository
    {
        Product GetSingle(int id);

        void Add(Product item);
        void Delete(int id);
        void Update(Product item);
        Task<List<Product>> GetProductsAsync();
        int Count();

        bool Save();
    }
}
