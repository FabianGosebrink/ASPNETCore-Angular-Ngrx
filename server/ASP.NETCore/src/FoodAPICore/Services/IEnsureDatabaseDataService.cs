using System.Threading.Tasks;

namespace FoodAPICore.Services
{
    public interface IEnsureDatabaseDataService
    {
        Task EnsureSeedData();
    }
}
