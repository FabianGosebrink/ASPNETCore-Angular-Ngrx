using FoodAPICore.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace FoodAPICore.Repositories
{
    public class IngredientRepository : IIngredientRepository
    {
        private readonly ConcurrentDictionary<Guid, Ingredient> _storage = new ConcurrentDictionary<Guid, Ingredient>();

        public Ingredient GetSingle(Guid id)
        {
            Ingredient ingredient;
            return _storage.TryGetValue(id, out ingredient) ? ingredient : null;
        }

        public void Add(Ingredient item)
        {
            item.Id = Guid.NewGuid();

            if (!_storage.TryAdd(item.Id, item))
            {
                throw new Exception("Item could not be added");
            }
        }

        public void Delete(Guid id)
        {
            Ingredient ingredient;
            if (!_storage.TryRemove(id, out ingredient))
            {
                throw new Exception("Item could not be removed");
            }
        }

        public Ingredient Update(Guid id, Ingredient item)
        {
            _storage.TryUpdate(id, item, GetSingle(id));
            return item;
        }

        public IQueryable<Ingredient> GetAll()
        {
            return _storage.Values.AsQueryable();
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
    }
}
