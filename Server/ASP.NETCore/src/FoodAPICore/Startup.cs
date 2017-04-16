using FoodAPICore.Models;
using FoodAPICore.Repositories.Food;
using FoodAPICore.Repositories;
using FoodAPICore.ViewModels;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Http;
using FoodAPICore.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodAPICore
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });


            var connectionString = Configuration["connectionStrings:DefaultConnection"];
            services.AddDbContext<FoodDbContext>(options => options.UseSqlServer(connectionString));

            services.AddSingleton<IFoodRepository, FoodRepository>();
            services.AddSingleton<IIngredientRepository, IngredientRepository>();
            // services.AddScoped<IFoodRepository, EfFoodRepository>();
            services.AddMvcCore(setup =>
            {
                setup.ReturnHttpNotAcceptable = true;
            })
                .AddJsonFormatters(options => options.ContractResolver = new CamelCasePropertyNamesContractResolver());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(appBuilder =>
                {
                    appBuilder.Run(async context =>
                    {
                        var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
                        if (exceptionHandlerFeature != null)
                        {
                            var logger = loggerFactory.CreateLogger("Global exception logger");
                            logger.LogError(500,
                                exceptionHandlerFeature.Error,
                                exceptionHandlerFeature.Error.Message);
                        }

                        context.Response.StatusCode = 500;
                        await context.Response.WriteAsync("An unexpected fault happened. Try again later.");
                    });
                });
            }

            app.UseCors("AllowAllOrigins");
            AutoMapper.Mapper.Initialize(mapper =>
            {
                mapper.CreateMap<FoodItem, FoodItemViewModel>().ReverseMap();
                mapper.CreateMap<FoodItem, FoodItemUpdateViewModel>().ReverseMap();
                mapper.CreateMap<Ingredient, IngredientViewModel>().ReverseMap();
                mapper.CreateMap<Ingredient, IngredientUpdateViewModel>().ReverseMap();
            });

            app.UseMvc();
        }
    }
}
