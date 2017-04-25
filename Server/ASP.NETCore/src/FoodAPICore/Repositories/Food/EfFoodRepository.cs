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

        public void Update(FoodItem item)
        {
            _foodDbContext.FoodItems.Update(item);
        }

        public IQueryable<FoodItem> GetAll()
        {
            return _foodDbContext.FoodItems;
        }

        public int Count()
        {
            return _foodDbContext.FoodItems.Count();
        }

        public bool Save()
        {
            return (_foodDbContext.SaveChanges() >= 0);
        }

        public ICollection<FoodItem> GetRandomMeal()
        {
            List<FoodItem> toReturn = new List<FoodItem>();

            toReturn.Add(GetRandomItem("Starter"));
            toReturn.Add(GetRandomItem("Main"));
            toReturn.Add(GetRandomItem("Dessert"));

            return toReturn;
        }

        private FoodItem GetRandomItem(string type)
        {
            return _foodDbContext.FoodItems
                .Where(x => x.Type == type)
                .OrderBy(o => Guid.NewGuid())
                .FirstOrDefault();
        }
    }
}
