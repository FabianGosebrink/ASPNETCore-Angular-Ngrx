using FoodAPICore.Models;
using System;
using System.Linq;

namespace FoodAPICore.Repositories
{
    public interface IIngredientRepository
    {
        Ingredient GetSingle(Guid id);
        void Add(Ingredient item);
        void Delete(Guid id);
        void Update(Ingredient item);
        IQueryable<Ingredient> GetAll();
        int Count();

        bool Save();
    }
}
