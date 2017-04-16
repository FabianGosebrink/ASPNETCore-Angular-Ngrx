using System.Collections.Generic;
using FoodAPICore.Models;
using System;

namespace FoodAPICore.Repositories
{
    public interface IFoodRepository
    {
        FoodItem GetSingle(Guid id);
        void Add(FoodItem item);
        void Delete(Guid id);
        FoodItem Update(Guid id, FoodItem item);
        ICollection<FoodItem> GetAll();
        int Count();

        bool Save();
    }
}
