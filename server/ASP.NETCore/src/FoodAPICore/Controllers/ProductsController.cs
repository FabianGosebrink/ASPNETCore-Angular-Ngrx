using System;
using AutoMapper;
using FoodAPICore.Entities;
using FoodAPICore.Dtos;
using Microsoft.AspNetCore.Mvc;
using FoodAPICore.Repositories;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace FoodAPICore.Controllers
{
    [Route("api/[controller]")]
 //   [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
    public class ProductsController : Controller
    {
        private readonly IProductRepository _foodRepository;
        private readonly IUrlHelper _urlHelper;
        private IHttpContextAccessor _accessor;

        public ProductsController(IUrlHelper urlHelper, IProductRepository foodRepository,
             IHttpContextAccessor accessor)
        {
            _foodRepository = foodRepository;
            _urlHelper = urlHelper;
            _accessor = accessor;
        }


        [HttpGet]
        //[NoCache]
        //[ProducesResponseType(typeof(List<Customer>), 200)]
        //[ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Products()
        {
            try
            {
                List<Product> products = await _foodRepository.GetProductsAsync();
           
                return Ok(products);
            }
            catch (Exception exp)
            {
               // _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        [HttpPost]
//        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult AddProduct([FromBody] ProductDto prod)
        {
            if (prod == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var toAdd = new Product
            {
                prod_desc = prod.prod_desc,
                prod_name = prod.prod_name,
                prod_price = prod.prod_price,
                updated_at = DateTime.Now
            };
            //Product toAdd = Mapper.Map<Product>(foodItemViewModel);

            _foodRepository.Add(toAdd);

            if (!_foodRepository.Save())
            {
                throw new Exception("Creating a fooditem failed on save.");
            }

            Product newProductItem = _foodRepository.GetSingle(toAdd.Id);
            //     _hubContext.Clients.All.SendAsync("food-added", Mapper.Map<ProductDto>(newProductItem));
            return Ok();
        }

        // //[HttpPatch("{id}", Name = nameof(PartiallyUpdateProduct))]
        // //[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        // //public IActionResult PartiallyUpdateProduct(int id, [FromBody] JsonPatchDocument<ProductItemUpdateDto> patchDoc)
        // //{
        // //    if (patchDoc == null)
        // //    {
        // //        return BadRequest();
        // //    }

        // //    Product foodItemFromRepo = _foodRepository.GetSingle(id);

        // //    if (foodItemFromRepo == null)
        // //    {
        // //        return NotFound();
        // //    }

        // //    //ProductDto foodItemToPatch = Mapper.Map<ProductDto>(foodItemFromRepo);
        // //    //patchDoc.ApplyTo(foodItemToPatch, ModelState);

        // //    //TryValidateModel(foodItemToPatch);

        // //    //if (!ModelState.IsValid)
        // //    //{
        // //    //    return BadRequest(ModelState);
        // //    //}

        // //    //Mapper.Map(foodItemToPatch, foodItemFromRepo);

        // //    //_foodRepository.Update(foodItemFromRepo);

        // //    //if (!_foodRepository.Save())
        // //    //{
        // //    //    throw new Exception("Updating a fooditem failed on save.");
        // //    //}
        // //    //_hubContext.Clients.All.SendAsync("food-updated", Mapper.Map<ProductItemDto>(foodItemFromRepo));
        // //    //return Ok(Mapper.Map<ProductItemDto>(foodItemFromRepo));
        // //    return Ok();
        // //}

        [HttpGet]
        [Route("{id}", Name = nameof(GetSingleProduct))]
        [AllowAnonymous]
        public IActionResult GetSingleProduct(int id)
        {
            Product foodItem = _foodRepository.GetSingle(id);

            if (foodItem == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpDelete]
        [Route("{id}", Name = nameof(RemoveProduct))]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult RemoveProduct(Guid id)
        {
            //ProductItem foodItem = _foodRepository.GetSingle(id);

            //if (foodItem == null)
            //{
            //    return NotFound();
            //}

            //_foodRepository.Delete(id);
            //_hubContext.Clients.All.SendAsync("food-deleted", id);
            //if (!_foodRepository.Save())
            //{
            //    throw new Exception("Deleting a fooditem failed on save.");
            //}

            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]//e = nameof(UpdateProduct))]
        [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult UpdateProduct(int id, [FromBody]ProductDto foodItem)
        {
            if (foodItem == null)
            {
                return BadRequest();
            }

            Product existingProductItem = _foodRepository.GetSingle(id);

            if (existingProductItem == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Mapper.Map(foodItem, existingProductItem);

            _foodRepository.Update(existingProductItem);

            if (!_foodRepository.Save())
            {
                throw new Exception("Updating a fooditem failed on save.");
            }

            //_hubContext.Clients.All.SendAsync("food-updated", existingProductItem);
            //return Ok(Mapper.Map<ProductItemDto>(existingProductItem));
            return Ok();
        }

        private List<LinkDto> CreateLinksForCollection(QueryParameters queryParameters, int totalCount)
        {
            var links = new List<LinkDto>();

            //// self 
            //links.Add(
            // new LinkDto(_urlHelper.Link(nameof(GetAllProducts), new
            // {
            //     pagecount = queryParameters.PageCount,
            //     page = queryParameters.Page,
            //     orderby = queryParameters.OrderBy
            // }), "self", "GET"));

            //links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllProducts), new
            //{
            //    pagecount = queryParameters.PageCount,
            //    page = 1,
            //    orderby = queryParameters.OrderBy
            //}), "first", "GET"));

            //links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllProducts), new
            //{
            //    pagecount = queryParameters.PageCount,
            //    page = queryParameters.GetTotalPages(totalCount),
            //    orderby = queryParameters.OrderBy
            //}), "last", "GET"));

            //if (queryParameters.HasNext(totalCount))
            //{
            //    links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllProducts), new
            //    {
            //        pagecount = queryParameters.PageCount,
            //        page = queryParameters.Page + 1,
            //        orderby = queryParameters.OrderBy
            //    }), "next", "GET"));
            //}

            //if (queryParameters.HasPrevious())
            //{
            //    links.Add(new LinkDto(_urlHelper.Link(nameof(GetAllProducts), new
            //    {
            //        pagecount = queryParameters.PageCount,
            //        page = queryParameters.Page - 1,
            //        orderby = queryParameters.OrderBy
            //    }), "previous", "GET"));
            //}

            return links;
        }

        //private dynamic ExpandSingleProductItem(ProductItem foodItem)
        //{
        //    var links = GetLinks(foodItem.Id);
        //    ProductItemDto item = Mapper.Map<ProductItemDto>(foodItem);

        //    var resourceToReturn = item.ToDynamic() as IDictionary<string, object>;
        //    resourceToReturn.Add("links", links);

        //    return resourceToReturn;
        //}

        private IEnumerable<LinkDto> GetLinks(Guid id)
        {
            var links = new List<LinkDto>();

            links.Add(
              new LinkDto(_urlHelper.Link(nameof(GetSingleProduct), new { id = id }),
              "self",
              "GET"));

            links.Add(
              new LinkDto(_urlHelper.Link(nameof(RemoveProduct), new { id = id }),
              "delete_food",
              "DELETE"));

            //links.Add(
            //  new LinkDto(_urlHelper.Link(nameof(AddProduct), null),
            //  "create_food",
            //  "POST"));

            links.Add(
               new LinkDto(_urlHelper.Link(nameof(UpdateProduct), new { id = id }),
               "update_food",
               "PUT"));

            return links;
        }
    }
}
