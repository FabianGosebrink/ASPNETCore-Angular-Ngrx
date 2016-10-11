using System;
using System.Linq;
using System.Net;
using AutoMapper;
using FoodAPICore.Models;
using FoodAPICore.Repositories.Food;
using FoodAPICore.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace FoodAPICore.Controller
{
    [Route("api/[controller]")]
    public class FoodController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly IFoodRepository _foodRepository;

        public FoodController(IFoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_foodRepository.GetAll().Select(x => Mapper.Map<FoodItemViewModel>(x)));
            }
            catch (Exception exception)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpPost]
        public IActionResult Add([FromBody] FoodItem foodItem)
        {
            try
            {
                FoodItem newFoodItem = _foodRepository.Add(foodItem);

                return Ok(Mapper.Map<FoodItemViewModel>(newFoodItem));
            }
            catch (Exception exception)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult Single(int id)
        {
            try
            {
                var foodItem = _foodRepository.GetSingle(id);

                if (foodItem == null)
                {
                    return NotFound();
                }

                return Ok(Mapper.Map<FoodItemViewModel>(foodItem));
            }
            catch (Exception exception)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Remove(int id)
        {
            try
            {
                FoodItem foodItem = _foodRepository.GetSingle(id);

                if (foodItem == null)
                {
                    return NotFound();
                }

                _foodRepository.Delete(id);
                return NoContent();
            }
            catch (Exception exception)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update(int id, [FromBody]FoodItem foodItem)
        {
            try
            {
                var foodItemToCheck = _foodRepository.GetSingle(id);

                if (foodItemToCheck == null)
                {
                    return NotFound();
                }

                if (id != foodItemToCheck.Id)
                {
                    return BadRequest("Ids do not match");
                }

                FoodItem update = _foodRepository.Update(id, foodItem);

                return Ok(Mapper.Map<FoodItemViewModel>(update));
            }
            catch (Exception exception)
            {
                return new StatusCodeResult(500);
            }
        }
    }
}
