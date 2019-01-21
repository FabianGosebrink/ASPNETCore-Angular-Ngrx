using FoodAPICore.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FoodAPICore.Repositories
{
    public interface IStatesRepository
    {
        Task<List<State>> GetStatesAsync();
    }
}