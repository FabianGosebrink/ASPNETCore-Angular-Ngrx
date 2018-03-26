using AutoMapper;
using FoodAPICore.Models;
using FoodAPICore.Repositories;
using FoodAPICore.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using FoodAPICore.Hubs;

namespace FoodAPICore.Controllers
{
    [Route("api/foods/{foodId}/[controller]")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
    public class IngredientsController : Controller
    {
        private readonly IIngredientRepository _repository;
        private readonly IFoodRepository _foodRepository;
        private readonly IHubContext<FoodHub> _hubContext;

        public IngredientsController(IIngredientRepository repository, IFoodRepository foodRepository, 
            IHubContext<FoodHub> hubContext)
        {
            _repository = repository;
            _foodRepository = foodRepository;
            _hubContext = hubContext;
        }

        // GET api/food/{foodId}/ingredients
        [HttpGet]
        public IActionResult GetIngredientsForFood(Guid foodId)
        {
            if (_foodRepository.GetSingle(foodId) == null)
            {
                return NotFound();
            }

            var allItems = _repository
                .GetAll()
                .Where(x => x.FoodItem.Id == foodId)
                .ToList();

            IEnumerable<IngredientDto> viewModels = allItems
               .Select(x => Mapper.Map<IngredientDto>(x));

            return Ok(viewModels);
        }
        
        // GET api/food/6/ingredients/3
        [HttpGet]
        [Route("{id}", Name = nameof(GetSingleIngredient))]
        public IActionResult GetSingleIngredient(Guid foodId, Guid id)
        {
            if (_foodRepository.GetSingle(foodId) == null)
            {
                return NotFound();
            }

            var singleItem = _repository
                .GetAll()
                .Where(x => x.FoodItem.Id == foodId && x.Id == id)
                .FirstOrDefault();

            if (singleItem == null)
            {
                return NotFound();
            }

            return Ok(Mapper.Map<IngredientDto>(singleItem));
        }

        // POST api/food/6/ingredients
        [HttpPost]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult AddIngredientToFood(Guid foodId, [FromBody] IngredientDto ingredient)
        {
            if (ingredient == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FoodItem foodItem = _foodRepository.GetSingle(foodId);

            if (foodItem == null)
            {
                return NotFound("FoodNotFound");
            }

            var ingredientModel = Mapper.Map<Ingredient>(ingredient);

            ingredientModel.FoodItem = foodItem;

            _repository.Add(ingredientModel);

            if (!_repository.Save())
            {
                throw new Exception($"Creating a ingredients for food {foodId} failed on save.");
            }

            var ingredientToReturn = Mapper.Map<IngredientDto>(ingredientModel);

            _hubContext.Clients.All.SendAsync("ingredient-added", foodId, ingredientToReturn);

            return CreatedAtRoute(nameof(GetSingleIngredient),
                new { foodId = foodId, id = ingredientToReturn.Id },
                ingredientToReturn);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult UpdateIngredientForFood(Guid foodId, Guid id, [FromBody] IngredientUpdateDto ingredient)
        {
            if (ingredient == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FoodItem foodItem = _foodRepository.GetSingle(foodId);
            if (foodItem == null)
            {
                return NotFound("FoodNotFound");
            }

            var singleItem = _repository.GetAll().Where(x => x.FoodItem.Id == foodId && x.Id == id).FirstOrDefault();
            if (singleItem == null)
            {
                return NotFound();
            }

            Mapper.Map(ingredient, singleItem);

            _repository.Update(singleItem);

            if (!_repository.Save())
            {
                throw new Exception("Updating an ingredient failed on save.");
            }

            var updatedIngredientDto = Mapper.Map<IngredientDto>(singleItem);

            _hubContext.Clients.All.SendAsync("ingredient-updated", foodId, updatedIngredientDto);

            return Ok(updatedIngredientDto);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult Remove(Guid foodId, Guid id)
        {
            FoodItem foodItem = _foodRepository.GetSingle(foodId);

            if (foodItem == null)
            {
                return NotFound("FoodNotFound");
            }

            var singleItem = _repository.GetAll().Where(x => x.FoodItem.Id == foodId && x.Id == id).FirstOrDefault();
            if (singleItem == null)
            {
                return NotFound();
            }

            _repository.Delete(id);

            if (!_repository.Save())
            {
                throw new Exception($"Deleting ingredient {id} for food {foodId} failed on save.");
            }

            _hubContext.Clients.All.SendAsync("ingredient-deleted", foodId, id);

            return NoContent();
        }
    }
}
