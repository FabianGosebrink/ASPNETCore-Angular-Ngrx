using AutoMapper;
using FoodAPICore.Dtos;
using FoodAPICore.Models;

namespace FoodAPICore.MappingProfiles
{
    public class FoodMappings : Profile
    {
        public FoodMappings()
        {
            CreateMap<FoodItem, FoodItemDto>().ReverseMap();
            CreateMap<FoodItem, FoodUpdateDto>().ReverseMap();
            CreateMap<FoodItem, FoodCreateDto>().ReverseMap();
        }
    }
}
