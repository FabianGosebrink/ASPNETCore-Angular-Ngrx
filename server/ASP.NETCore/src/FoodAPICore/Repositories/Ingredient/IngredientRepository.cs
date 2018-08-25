using FoodAPICore.Entities;
using FoodAPICore.Models;
using System;
using System.Linq;

namespace FoodAPICore.Repositories
{
    public class IngredientRepository : IIngredientRepository
    {
        FoodDbContext _foodDbContext;

        public IngredientRepository(FoodDbContext foodDbContext)
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
