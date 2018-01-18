using System;
using System.Linq;
using AutoMapper;
using FoodAPICore.Models;
using FoodAPICore.Dtos;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using FoodAPICore.Repositories;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using FoodAPICore.Helpers;
using IdentityServer4.AccessTokenValidation;
using Newtonsoft.Json;

namespace FoodAPICore.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
    public class FoodsController : Controller
    {
        private readonly IFoodRepository _foodRepository;
        private readonly IUrlHelper _urlHelper;

        public FoodsController(IUrlHelper urlHelper, IFoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
            _urlHelper = urlHelper;
        }

        [HttpGet(Name = nameof(GetAllFoods))]
        [AllowAnonymous]
        public IActionResult GetAllFoods([FromQuery] QueryParameters queryParameters)
        {
            List<FoodItem> foodItems = _foodRepository.GetAll(queryParameters).ToList();

            var allItemCount = _foodRepository.Count();

            var paginationMetadata = new
            {
                totalCount = allItemCount,
                pageSize = queryParameters.PageCount,
                currentPage = queryParameters.Page,
                totalPages = queryParameters.GetTotalPages(allItemCount)
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationMetadata));

            List<LinkDto> links = CreateLinksForCollection(queryParameters, allItemCount);

            var toReturn = foodItems.Select(x => ExpandSingleFoodItem(x));

            return Ok(new
            {
                value = toReturn,
                links
            });
        }

        [HttpGet("GetRandomMeal", Name = nameof(GetRandomMeal))]
        [AllowAnonymous]
        public IActionResult GetRandomMeal()
        {
            ICollection<FoodItem> foodItems = _foodRepository.GetRandomMeal();

            IEnumerable<FoodItemDto> dtos = foodItems
                .Select(x => Mapper.Map<FoodItemDto>(x));

            var links = new List<LinkDto>();

            // self 
            links.Add(new LinkDto(_urlHelper.Link(nameof(GetRandomMeal), null), "self", "GET"));

            return Ok(new
            {
                value = dtos,
                links
            });
        }

        [HttpPost(Name = nameof(AddFood))]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult AddFood([FromBody] FoodItemCreateDto foodItemViewModel)
        {
            if (foodItemViewModel == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FoodItem toAdd = Mapper.Map<FoodItem>(foodItemViewModel);

            _foodRepository.Add(toAdd);

            if (!_foodRepository.Save())
            {
                throw new Exception("Creating a fooditem failed on save.");
            }

            FoodItem newFoodItem = _foodRepository.GetSingle(toAdd.Id);

            return CreatedAtRoute("GetSingleFood", new { id = newFoodItem.Id },
                Mapper.Map<FoodItemDto>(newFoodItem));
        }

        [HttpPatch("{id}", Name = nameof(PartiallyUpdateFood))]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult PartiallyUpdateFood(Guid id, [FromBody] JsonPatchDocument<FoodItemUpdateDto> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            FoodItem foodItemFromRepo = _foodRepository.GetSingle(id);

            if (foodItemFromRepo == null)
            {
                return NotFound();
            }

            FoodItemUpdateDto foodItemToPatch = Mapper.Map<FoodItemUpdateDto>(foodItemFromRepo);
            patchDoc.ApplyTo(foodItemToPatch, ModelState);

            TryValidateModel(foodItemToPatch);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Mapper.Map(foodItemToPatch, foodItemFromRepo);

            _foodRepository.Update(foodItemFromRepo);

            if (!_foodRepository.Save())
            {
                throw new Exception("Updating a fooditem failed on save.");
            }

            return Ok(Mapper.Map<FoodItemDto>(foodItemFromRepo));
        }

        [HttpGet]
        [Route("{id}", Name = nameof(GetSingleFood))]
        [AllowAnonymous]
        public IActionResult GetSingleFood(Guid id)
        {
            FoodItem foodItem = _foodRepository.GetSingle(id);

            if (foodItem == null)
            {
                return NotFound();
            }

            return Ok(ExpandSingleFoodItem(foodItem));
        }

        [HttpDelete]
        [Route("{id}", Name = nameof(RemoveFood))]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult RemoveFood(Guid id)
        {
            FoodItem foodItem = _foodRepository.GetSingle(id);

            if (foodItem == null)
            {
                return NotFound();
            }

            _foodRepository.Delete(id);

            if (!_foodRepository.Save())
            {
                throw new Exception("Deleting a fooditem failed on save.");
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}", Name = nameof(UpdateFood))]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult UpdateFood(Guid id, [FromBody]FoodItemUpdateDto foodItem)
        {
            if (foodItem == null)
            {
                return BadRequest();
            }

            FoodItem existingFoodItem = _foodRepository.GetSingle(id);

            if (existingFoodItem == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Mapper.Map(foodItem, existingFoodItem);

            _foodRepository.Update(existingFoodItem);

            if (!_foodRepository.Save())
            {
                throw new Exception("Updating a fooditem failed on save.");
            }

            return Ok(Mapper.Map<FoodItemDto>(existingFoodItem));
        }

        private List<LinkDto> CreateLinksForCollection(QueryParameters queryParameters, int totalCount)
        {
            var links = new List<LinkDto>();

            // self 
            links.Add(
             new LinkDto(_urlHelper.Link(nameof(GetAllFoods), new
             {
                 pagecount = queryParameters.PageCount,
                 page = queryParameters.Page,
                 orderby = queryParameters.OrderBy
             }), "self", "GET"));

            links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllFoods), new
            {
                pagecount = queryParameters.PageCount,
                page = 1,
                orderby = queryParameters.OrderBy
            }), "first", "GET"));

            links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllFoods), new
            {
                pagecount = queryParameters.PageCount,
                page = queryParameters.GetTotalPages(totalCount),
                orderby = queryParameters.OrderBy
            }), "last", "GET"));

            if (queryParameters.HasNext(totalCount))
            {
                links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllFoods), new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page + 1,
                    orderby = queryParameters.OrderBy
                }), "next", "GET"));
            }

            if (queryParameters.HasPrevious())
            {
                links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllFoods), new
                {
                    pagecount = queryParameters.PageCount,
                    page = queryParameters.Page - 1,
                    orderby = queryParameters.OrderBy
                }), "previous", "GET"));
            }

            return links;
        }

        private dynamic ExpandSingleFoodItem(FoodItem foodItem)
        {
            var links = GetLinks(foodItem.Id);
            FoodItemDto item = Mapper.Map<FoodItemDto>(foodItem);

            var resourceToReturn = item.ToDynamic() as IDictionary<string, object>;
            resourceToReturn.Add("links", links);

            return resourceToReturn;
        }

        private IEnumerable<LinkDto> GetLinks(Guid id)
        {
            var links = new List<LinkDto>();

            links.Add(
              new LinkDto(_urlHelper.Link(nameof(GetSingleFood), new { id = id }),
              "self",
              "GET"));

            links.Add(
              new LinkDto(_urlHelper.Link(nameof(RemoveFood), new { id = id }),
              "delete_food",
              "DELETE"));

            links.Add(
              new LinkDto(_urlHelper.Link(nameof(AddFood), null),
              "create_food",
              "POST"));

            links.Add(
               new LinkDto(_urlHelper.Link(nameof(UpdateFood), new { id = id }),
               "update_food",
               "PUT"));

            return links;
        }
    }
}
