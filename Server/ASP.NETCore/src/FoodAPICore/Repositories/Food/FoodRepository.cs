using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using FoodAPICore.Models;

namespace FoodAPICore.Repositories.Food
{
    public class FoodRepository : IFoodRepository
    {
        private readonly ConcurrentDictionary<Guid, FoodItem> _storage = new ConcurrentDictionary<Guid, FoodItem>();

        public FoodItem GetSingle(Guid id)
        {
            FoodItem foodItem;
            return _storage.TryGetValue(id, out foodItem) ? foodItem : null;
        }

        public void Add(FoodItem item)
        {
            item.Id = Guid.NewGuid();

            if (!_storage.TryAdd(item.Id, item))
            {
                throw new Exception("Item could not be added");
            }
        }

        public void Delete(Guid id)
        {
            FoodItem foodItem;
            if (!_storage.TryRemove(id, out foodItem))
            {
                throw new Exception("Item could not be removed");
            }
        }

        public FoodItem Update(Guid id, FoodItem item)
        {
            _storage.TryUpdate(id, item, GetSingle(id));
            return item;
        }

        public ICollection<FoodItem> GetAll()
        {
            return _storage.Values;
        }

        public int Count()
        {
            return _storage.Count;
        }

        public bool Save()
        {
            // To keep interface consistent with Controllers, Tests & EF Interfaces
            return true;
        }

        public List<FoodItem> GetRandomMeal()
        {
            throw new NotImplementedException();
        }
    }
}