using System;
using System.Linq;
using AutoMapper;
using FoodAPICore.Models;
using FoodAPICore.Repositories.Food;
using FoodAPICore.ViewModels;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace FoodAPICore.Controller
{
    [Route("api/[controller]")]
    public class FoodController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly IFoodRepository _foodRepository;
        private readonly ILogger<FoodController> _logger;

        public FoodController(ILogger<FoodController> logger, IFoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
            _logger = logger;
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
                _logger.LogCritical("Error", exception);
                return new StatusCodeResult(500);
            }
        }

        [HttpPost]
        public IActionResult Add([FromBody] FoodItemViewModel foodItemViewModel)
        {
            try
            {
                if (foodItemViewModel == null)
                {
                    return BadRequest();
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                FoodItem newFoodItem = _foodRepository.Add(Mapper.Map<FoodItem>(foodItemViewModel));

                return CreatedAtRoute("GetSingleFood", new { id = newFoodItem.Id }, Mapper.Map<FoodItemViewModel>(newFoodItem));
            }
            catch (Exception exception)
            {
                _logger.LogCritical("Error", exception);
                return new StatusCodeResult(500);
            }
        }

        [HttpPatch("{id:int}")]
        public IActionResult PartiallyUpdate(int id, [FromBody] JsonPatchDocument<FoodItemViewModel> patchDoc)
        {
            try
            {
                if (patchDoc == null)
                {
                    return BadRequest();
                }

                FoodItem existingEntity = _foodRepository.GetSingle(id);

                if (existingEntity == null)
                {
                    return NotFound();
                }

                FoodItemViewModel foodItemViewModel = Mapper.Map<FoodItemViewModel>(existingEntity);
                patchDoc.ApplyTo(foodItemViewModel, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                FoodItem updated = _foodRepository.Update(id, Mapper.Map<FoodItem>(foodItemViewModel));

                return Ok(Mapper.Map<FoodItemViewModel>(updated));
            }
            catch (Exception exception)
            {
                _logger.LogCritical("Error", exception);
                return new StatusCodeResult(500);
            }
        }

        [HttpGet]
        [Route("{id:int}", Name = "GetSingleFood")]
        public IActionResult Single(int id)
        {
            try
            {
                FoodItem foodItem = _foodRepository.GetSingle(id);

                if (foodItem == null)
                {
                    return NotFound();
                }

                return Ok(Mapper.Map<FoodItemViewModel>(foodItem));
            }
            catch (Exception exception)
            {
                _logger.LogCritical("Error", exception);
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
                _logger.LogCritical("Error", exception);
                return new StatusCodeResult(500);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update(int id, [FromBody]FoodItemViewModel foodItem)
        {
            try
            {
                var foodItemToCheck = _foodRepository.GetSingle(id);

                if (foodItemToCheck == null)
                {
                    return NotFound();
                }

                if (id != foodItem.Id)
                {
                    return BadRequest("Ids do not match");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                FoodItem update = _foodRepository.Update(id, Mapper.Map<FoodItem>(foodItem));

                return Ok(Mapper.Map<FoodItemViewModel>(update));
            }
            catch (Exception exception)
            {
                _logger.LogCritical("Error", exception);
                return new StatusCodeResult(500);
            }
        }
    }
}
