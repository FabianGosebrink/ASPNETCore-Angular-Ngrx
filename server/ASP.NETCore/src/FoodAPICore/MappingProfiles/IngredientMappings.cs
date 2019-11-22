using AutoMapper;
using FoodAPICore.Dtos;
using FoodAPICore.Models;

namespace FoodAPICore.MappingProfiles
{
    public class IngredientMappings : Profile
    {
        public IngredientMappings()
        {
            CreateMap<Ingredient, IngredientDto>().ReverseMap();
            CreateMap<Ingredient, IngredientUpdateDto>().ReverseMap();
        }
    }
}
