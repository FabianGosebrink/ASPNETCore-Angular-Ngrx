using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using FoodAPI.Models;

namespace FoodAPI.Repositories.Food
{
    public class FoodRepository : IFoodRepository
    {
        private ConcurrentDictionary<int, FoodItem> _storage = new ConcurrentDictionary<int, FoodItem>();

        public FoodItem GetSingle(int id)
        {
            FoodItem foodItem;
            if (_storage.TryGetValue(id, out foodItem))
            {
                return foodItem;
            }

            return null;
        }

        public FoodItem Add(FoodItem item)
        {
            item.Id = !GetAll().Any() ? 1 : GetAll().Max(x => x.Id) + 1;

            if (_storage.TryAdd(item.Id, item))
            {
                return item;
            }

            throw new Exception("Adding item not possible.");
        }

        public void Delete(int id)
        {
            FoodItem foodItem;
            if (!_storage.TryRemove(id, out foodItem))
            {
                throw new Exception("Removing item not possible");
            }
        }

        public FoodItem Update(int id, FoodItem item)
        {
            _storage.TryUpdate(id, item, GetSingle(id));
            return GetSingle(id);
        }

        public ICollection<FoodItem> GetAll()
        {
            return _storage.Values;
        }

        public int Count()
        {
            return _storage.Count;
        }
    }
}