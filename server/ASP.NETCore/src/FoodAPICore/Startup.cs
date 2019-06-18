using FoodAPICore.Models;
using FoodAPICore.Repositories.Food;
using FoodAPICore.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using FoodAPICore.Entities;
using Microsoft.EntityFrameworkCore;
using FoodAPICore.Services;
using FoodAPICore.Dtos;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Newtonsoft.Json.Serialization;
using FoodAPICore.Hubs;

namespace FoodAPICore
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
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
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });

            services.AddDbContext<FoodDbContext>(opt => opt.UseInMemoryDatabase("FoodDatabase"));
            // services.AddDbContext<FoodDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<IFoodRepository, FoodRepository>();
            services.AddScoped<IIngredientRepository, IngredientRepository>();
            services.AddScoped<IEnsureDatabaseDataService, EnsureDatabaseDataService>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

            services.AddRouting(options => options.LowercaseUrls = true);

            services.AddScoped<IUrlHelper>(x =>
            {
                var actionContext = x.GetRequiredService<IActionContextAccessor>().ActionContext;
                var factory = x.GetRequiredService<IUrlHelperFactory>();
                return factory.GetUrlHelper(actionContext);
            });

            services.AddSignalR();

            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "FoodAPICore", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseExceptionHandler(errorApp =>
                {
                    errorApp.Run(async context =>
                    {
                        context.Response.StatusCode = 500;
                        context.Response.ContentType = "text/plain";
                        var errorFeature = context.Features.Get<IExceptionHandlerFeature>();
                        if (errorFeature != null)
                        {
                            var logger = loggerFactory.CreateLogger("Global exception logger");
                            logger.LogError(500, errorFeature.Error, errorFeature.Error.Message);
                        }

                        await context.Response.WriteAsync("There was an error");
                    });
                });
            }

            app.UseCors("AllowAllOrigins");
            app.UseHttpsRedirection();

            AutoMapper.Mapper.Initialize(mapper =>
            {
                mapper.CreateMap<FoodItem, FoodItemDto>().ReverseMap();
                mapper.CreateMap<FoodItem, FoodItemUpdateDto>().ReverseMap();
                mapper.CreateMap<FoodItem, FoodItemCreateDto>().ReverseMap();
                mapper.CreateMap<Ingredient, IngredientDto>().ReverseMap();
                mapper.CreateMap<Ingredient, IngredientUpdateDto>().ReverseMap();
            });
            
            app.UseStaticFiles();
            app.UseDefaultFiles();

            app.UseSignalR(routes =>
            {
                routes.MapHub<FoodHub>("/foodhub");
            });

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "FoodAPICore V1");
            });

            app.UseMvcWithDefaultRoute();
        }
    }
}
