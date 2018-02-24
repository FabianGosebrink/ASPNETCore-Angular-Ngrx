using FoodAPICore.Entities;
using FoodAPICore.Models;
using System;
using System.Collections.Concurrent;
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

        public void Update(Ingredient item)
        {
            _storage.TryUpdate(item.Id, item, GetSingle(item.Id));
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

    public class EfIngredientRepository : IIngredientRepository
    {
        FoodDbContext _foodDbContext;

        public EfIngredientRepository(FoodDbContext foodDbContext)
        {
            _foodDbContext = foodDbContext;
        }

        public void Add(Ingredient item)
        {
            _foodDbContext.Ingredients.Add(item);
        }

        public int Count()
        {
            return _foodDbContext.Ingredients.Count();
        }

        public void Delete(Guid id)
        {
            Ingredient toRemove = GetSingle(id);
            _foodDbContext.Ingredients.Remove(toRemove);
        }

        public IQueryable<Ingredient> GetAll()
        {
            return _foodDbContext.Ingredients;
        }

        public Ingredient GetSingle(Guid id)
        {
            return _foodDbContext.Ingredients.FirstOrDefault(x => x.Id == id);
        }

        public bool Save()
        {
            return (_foodDbContext.SaveChanges() >= 0);
        }

        public void Update(Ingredient item)
        {
            _foodDbContext.Ingredients.Update(item);
        }
    }
}
