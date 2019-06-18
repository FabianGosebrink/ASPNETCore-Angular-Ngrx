using FoodAPICore.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace FoodAPICore.Services
{
    public interface IEnsureDatabaseDataService
    {
        Task EnsureSeedData(FoodDbContext context);
    }
}
