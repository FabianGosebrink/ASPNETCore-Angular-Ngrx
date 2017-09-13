using System.Collections.Generic;
using FoodAPICore.Models;
using System;
using System.Linq;

namespace FoodAPICore.Repositories
{
    public interface IFoodRepository
    {
        FoodItem GetSingle(Guid id);
        void Add(FoodItem item);
        void Delete(Guid id);
        void Update(FoodItem item);
        IQueryable<FoodItem> GetAll(QueryParameters queryParameters);

        ICollection<FoodItem> GetRandomMeal();
        int Count();

        bool Save();
    }
}
