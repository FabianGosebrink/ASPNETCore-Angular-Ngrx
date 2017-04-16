using FoodAPICore.Entities;
using FoodAPICore.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodAPICore.Repositories.Food
{
    public class EfFoodRepository : IFoodRepository
    {
        private readonly FoodDbContext _foodDbContext;

        public EfFoodRepository(FoodDbContext foodDbContext)
        {
            _foodDbContext = foodDbContext;
        }

        public FoodItem GetSingle(Guid id)
        {
            return _foodDbContext.FoodItems.FirstOrDefault(x => x.Id == id);
        }

        public void Add(FoodItem item)
        {
            _foodDbContext.FoodItems.Add(item);
        }

        public void Delete(Guid id)
        {
            FoodItem foodItem = GetSingle(id);
            _foodDbContext.FoodItems.Remove(foodItem);
        }

        public FoodItem Update(Guid id, FoodItem item)
        {
            FoodItem existingFoodItem = GetSingle(id);
            _foodDbContext.FoodItems.Update(existingFoodItem);

            existingFoodItem.Id = item.Id;
            existingFoodItem.Calories = item.Calories;
            existingFoodItem.Name = item.Name;

            return existingFoodItem;
        }

        public ICollection<FoodItem> GetAll()
        {
            return _foodDbContext.FoodItems.ToList();
        }

        public int Count()
        {
            return _foodDbContext.FoodItems.Count();
        }

        public bool Save()
        {
            return (_foodDbContext.SaveChanges() >= 0);
        }
    }
}
