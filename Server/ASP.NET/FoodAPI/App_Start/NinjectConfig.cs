
using FoodAPI.Repositories.Food;
using Ninject;

namespace FoodAPI
{
    public static class NinjectConfig
    {
        public static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();

            kernel.Bind<IFoodRepository>().ToConstant(new FoodRepository());

            return kernel;
        }
    }
}
