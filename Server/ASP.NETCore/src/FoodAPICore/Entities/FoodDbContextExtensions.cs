using FoodAPICore.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace FoodAPICore.Entities
{
    public static class FoodDbContextExtensions
    {
        public static async void EnsureSeedData(this IApplicationBuilder app)
        {
            // Uses app.ApplicationServices to access to the DI container(the IServiceProvider),
            // and gets the instance of the DbService to populate db.
            var ensureDatabaseDataService = app.ApplicationServices.GetRequiredService<IEnsureDatabaseDataService>();
            await ensureDatabaseDataService.EnsureSeedData();
        }
    }
}
