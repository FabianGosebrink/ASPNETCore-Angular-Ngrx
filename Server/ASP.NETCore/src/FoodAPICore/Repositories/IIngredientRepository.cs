using FoodAPICore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodAPICore.Repositories
{
    public interface IIngredientRepository
    {
        Ingredient GetSingle(Guid id);
        void Add(Ingredient item);
        void Delete(Guid id);
        Ingredient Update(Guid id, Ingredient item);
        IQueryable<Ingredient> GetAll();
        int Count();

        bool Save();
    }
}
