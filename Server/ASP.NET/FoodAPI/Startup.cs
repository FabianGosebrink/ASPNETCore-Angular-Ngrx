using System;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using FoodAPI.Models;
using FoodAPI.ViewModels;
using Microsoft.Owin;
using Owin;
using WebApiContrib.IoC.Ninject;

[assembly: OwinStartup(typeof(FoodAPI.Startup))]

namespace FoodAPI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration
            {
                DependencyResolver = new NinjectResolver(NinjectConfig.CreateKernel())
            };

            WebApiConfig.Register(config);

            var cors = new EnableCorsAttribute("*", "*", "*");
            config.EnableCors(cors);

            Mapper.Initialize(mapper =>
            {
                mapper.CreateMap<FoodItem, FoodItemViewModel>().ReverseMap();
            });

            app.UseWebApi(config);
        }
    }
}
