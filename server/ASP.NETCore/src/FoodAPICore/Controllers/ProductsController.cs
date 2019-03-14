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
        private readonly IProductRepository _productRepository;
        private readonly IUrlHelper _urlHelper;
        private IHttpContextAccessor _accessor;

        public ProductsController(IUrlHelper urlHelper, IProductRepository productRepository, 
             IHttpContextAccessor accessor)
        {
            _productRepository = productRepository;
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
                List<Product> products = await _productRepository.GetProductsAsync();
           
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
                prod_price = 123,
                updated_at = DateTime.Now
            };
            //Product toAdd = Mapper.Map<Product>(productitemViewModel);

            _productRepository.Add(toAdd);

            if (!_productRepository.Save())
            {
                throw new Exception("Creating a productitem failed on save.");
            }

            Product newProductItem = _productRepository.GetSingle(toAdd.Id);
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

        // //    Product productitemFromRepo = _productRepository.GetSingle(id);

        // //    if (productitemFromRepo == null)
        // //    {
        // //        return NotFound();
        // //    }

        // //    //ProductDto productitemToPatch = Mapper.Map<ProductDto>(productitemFromRepo);
        // //    //patchDoc.ApplyTo(productitemToPatch, ModelState);

        // //    //TryValidateModel(productitemToPatch);

        // //    //if (!ModelState.IsValid)
        // //    //{
        // //    //    return BadRequest(ModelState);
        // //    //}

        // //    //Mapper.Map(productitemToPatch, productitemFromRepo);

        // //    //_productRepository.Update(productitemFromRepo);

        // //    //if (!_productRepository.Save())
        // //    //{
        // //    //    throw new Exception("Updating a productitem failed on save.");
        // //    //}
        // //    //_hubContext.Clients.All.SendAsync("food-updated", Mapper.Map<ProductItemDto>(productitemFromRepo));
        // //    //return Ok(Mapper.Map<ProductItemDto>(productitemFromRepo));
        // //    return Ok();
        // //}

        [HttpGet]
        [Route("{id}", Name = nameof(GetSingleProduct))]
        [AllowAnonymous]
        public IActionResult GetSingleProduct(int id)
        {
            Product productitem = _productRepository.GetSingle(id);

            if (productitem == null)
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpDelete]
        [Route("{id}", Name = nameof(RemoveProduct))]
  //      [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult RemoveProduct(int id)
        {

            var item = _productRepository.GetSingle(id);

            if (item == null)
            {
                return NotFound();
            }
            _productRepository.Delete(id);
            //_hubContext.Clients.All.SendAsync("food-deleted", id);
            if (!_productRepository.Save())
            {
                throw new Exception("Deleting a product failed on save.");
            }

            return NoContent();
        }

        [HttpPut]
        [Route("{id}")]//e = nameof(UpdateProduct))]
 //       [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Modify Resources")]
        public IActionResult UpdateProduct(int id, [FromBody]ProductDto productitem)
        {
            if (productitem == null)
            {
                return BadRequest();
            }

            Product existingProductItem = _productRepository.GetSingle(id);

            if (existingProductItem == null)
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
         //   productitem.update_at = DateTime.Now;
            Mapper.Map(productitem, existingProductItem);

            _productRepository.Update(existingProductItem);

            if (!_productRepository.Save())
            {
                throw new Exception("Updating a productitem failed on save.");
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

        //private dynamic ExpandSingleProductItem(ProductItem productitem)
        //{
        //    var links = GetLinks(productitem.Id);
        //    ProductItemDto item = Mapper.Map<ProductItemDto>(productitem);

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
