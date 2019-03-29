
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodAPICore.Entities;
using FoodAPICore.Repositories;
using IdentityServer4.AccessTokenValidation;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using FoodAPICore.Dtos;

namespace FoodAPICore.Controllers
{
    [Route("api/[controller]")]
  //  [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme, Policy = "Access Resources")]
    public class PeriodicElementsController : Controller
    {
        IPeriodicElementsRepository _PeriodicElementsRepository;
        ILogger _Logger;

        public PeriodicElementsController(IPeriodicElementsRepository PeriodicElementsRepo, ILoggerFactory loggerFactory) {
            _PeriodicElementsRepository = PeriodicElementsRepo;
            _Logger = loggerFactory.CreateLogger(nameof(PeriodicElementsController));
        }

        // GET api/customers
        [HttpGet]
        //[NoCache]
        //[ProducesResponseType(typeof(List<Customer>), 200)]
        //[ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> PeriodicElements()
        {
            try
            {
                var PeriodicElements = await _PeriodicElementsRepository.GetPeriodicElementsAsync();
                return Ok(PeriodicElements);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        //   // GET api/customers/page/10/10
        //   [HttpGet("page/{skip}/{take}")]
        //  // [NoCache]
        //   [ProducesResponseType(typeof(List<Customer>), 200)]
        //   [ProducesResponseType(typeof(ApiResponse), 400)]
        //   public async Task<ActionResult> CustomersPage(int skip, int take)
        //   {
        //       try
        //       {
        //           var pagingResult = await _CustomersRepository.GetCustomersPageAsync(skip, take);
        //           Response.Headers.Add("X-InlineCount", pagingResult.TotalRecords.ToString());
        //           return Ok(pagingResult.Records);
        //       }
        //       catch (Exception exp)
        //       {
        //           _Logger.LogError(exp.Message);
        //           return BadRequest(new ApiResponse { Status = false });
        //       }
        //   }

        // GET api/GetPeriodicElementRoute/5
        [HttpGet("{id}", Name = "GetPeriodicElementRoute")]
        // [NoCache]
        [ProducesResponseType(typeof(Customer), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> PeriodicElements(int id)
        {
            try
            {
                var element = await _PeriodicElementsRepository.GetGetPeriodicElementAsync(id);
                return Ok(element);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // POST api/customers
        [HttpPost]
        //   [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 201)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> CreatePeriodicElement([FromBody]PeriodicElement element)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                // element.id must be 0 to insert
                var elem = await _PeriodicElementsRepository.InsertPeriodicElementAsync(element);
                if (elem == null)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(elem);
               // useless
                //return CreatedAtRoute("GetPeriodicElementRoute", new { id = elem.position },
                //        new ApiResponse { Status = true });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // PUT api/PeriodicElements/5
        [HttpPut("{id}")]
        ////[ProducesResponseType(typeof(ApiResponse), 200)]
        ////[ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> UpdatePeriodicElement(int id, [FromBody]PeriodicElement element)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var status = await _PeriodicElementsRepository.UpdatePeriodicElementAsync(element);
                if (!status)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(new ApiResponse { Status = true });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // DELETE api/customers/5
        [HttpDelete("{id}")]
        //[Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme,
        //    Policy = "Modify Resources")]
        //     [ValidateAntiForgeryToken] //  bug?
        [ProducesResponseType(typeof(ApiResponse), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var status = await _PeriodicElementsRepository.DeleteAsync(id);
                if (!status)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return Ok(new ApiResponse { Status = true });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

    }
}
