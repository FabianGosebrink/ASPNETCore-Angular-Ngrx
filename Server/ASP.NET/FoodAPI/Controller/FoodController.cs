using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using AutoMapper;
using FoodAPI.Models;
using FoodAPI.Repositories.Food;
using FoodAPI.ViewModels;

namespace FoodAPI.Controller
{
    [RoutePrefix("api")]
    public class FoodController : ApiController
    {
        private readonly IFoodRepository _foodRepository;

        public FoodController(IFoodRepository foodRepository)
        {
            _foodRepository = foodRepository;
        }

        [HttpGet]
        [ResponseType(typeof(FoodItem[]))]
        [Route("food")]
        public IHttpActionResult List()
        {
            try
            {
                return Ok(_foodRepository.GetAll().Select(x => Mapper.Map<FoodItemViewModel>(x)));
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpPost]
        [ResponseType(typeof(FoodItem))]
        [Route("food")]
        public IHttpActionResult Add(FoodItem foodItem)
        {
            try
            {
                FoodItem newFoodItem = _foodRepository.Add(foodItem);

                return Ok(Mapper.Map<FoodItemViewModel>(newFoodItem));
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpGet]
        [ResponseType(typeof(FoodItem))]
        [Route("food/{id:int}")]
        public IHttpActionResult Single(int id)
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
                return InternalServerError(exception);
            }
        }

        [HttpDelete]
        [Route("food/{id:int}")]
        public IHttpActionResult Remove(int id)
        {
            try
            {
                FoodItem foodItem = _foodRepository.GetSingle(id);

                if (foodItem == null)
                {
                    return NotFound();
                }

                _foodRepository.Delete(id);
                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception exception)
            {
                return InternalServerError(exception);
            }
        }

        [HttpPut]
        [Route("food/{id:int}")]
        public IHttpActionResult Update(int id, [FromBody]FoodItem foodItem)
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
                return InternalServerError(exception);
            }
        }
    }
}
