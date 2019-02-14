
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
    public class UserNotesController : Controller
    {
        IUserNotesRepository _UserNotesRepository;
        ILogger _Logger;

        public UserNotesController(IUserNotesRepository userNotesRepo, ILoggerFactory loggerFactory) {
            _UserNotesRepository = userNotesRepo;
            _Logger = loggerFactory.CreateLogger(nameof(CustomersController));
        }

        // GET api/customers
        [HttpGet]
        //[NoCache]
        //[ProducesResponseType(typeof(List<Customer>), 200)]
        //[ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> UserNotes()
        {
            try
            {
                var userNotes = await _UserNotesRepository.GetUserNotesAsync();
                return Ok(userNotes);
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

        //   // GET api/customers/5
        //   [HttpGet("{id}", Name = "GetCustomerRoute")]
        //  // [NoCache]
        //   [ProducesResponseType(typeof(Customer), 200)]
        //   [ProducesResponseType(typeof(ApiResponse), 400)]
        //   public async Task<ActionResult> Customers(int id)
        //   {
        //       try
        //       {
        //           var customer = await _CustomersRepository.GetCustomerAsync(id);
        //           return Ok(customer);
        //       }
        //       catch (Exception exp)
        //       {
        //           _Logger.LogError(exp.Message);
        //           return BadRequest(new ApiResponse { Status = false });
        //       }
        //   }

        // POST api/customers
        [HttpPost]
        //   [ValidateAntiForgeryToken]
        [ProducesResponseType(typeof(ApiResponse), 201)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> CreateUser([FromBody]User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var newUser = await _UserNotesRepository.InsertUserAsync(user);
                if (newUser == null)
                {
                    return BadRequest(new ApiResponse { Status = false });
                }
                return CreatedAtRoute("GetCustomerRoute", new { id = newUser.id },
                        new ApiResponse { Status = true });
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        //   // PUT api/customers/5
        //   [HttpPut("{id}")]
        //   ////[ProducesResponseType(typeof(ApiResponse), 200)]
        //   ////[ProducesResponseType(typeof(ApiResponse), 400)]
        //   public async Task<ActionResult> UpdateCustomer(int id, [FromBody]Customer customer)
        //   {
        //       if (!ModelState.IsValid)
        //       {
        //           return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
        //       }

        //       try
        //       {      
        //           var status = await _CustomersRepository.UpdateCustomerAsync(customer);
        //           if (!status)
        //           {
        //               return BadRequest(new ApiResponse { Status = false });
        //           }
        //           return Ok(new ApiResponse { Status = true });
        //       }
        //       catch (Exception exp)
        //       {
        //           _Logger.LogError(exp.Message);
        //           return BadRequest(new ApiResponse { Status = false });
        //       }
        //   }

        //   // DELETE api/customers/5
        //   [HttpDelete("{id}")]
        //   [Authorize(AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme,
        //       Policy = "Modify Resources")]
        //   //     [ValidateAntiForgeryToken] //  bug?
        //   [ProducesResponseType(typeof(ApiResponse), 200)]
        //   [ProducesResponseType(typeof(ApiResponse), 400)]
        //   public async Task<ActionResult> Delete(int id)
        //   {
        //       try
        //       {
        //           var status = await _CustomersRepository.DeleteCustomerAsync(id);
        //           if (!status)
        //           {
        //               return BadRequest(new ApiResponse { Status = false });
        //           }
        //           return Ok(new ApiResponse { Status = true });
        //       }
        //       catch (Exception exp)
        //       {
        //           _Logger.LogError(exp.Message);
        //           return BadRequest(new ApiResponse { Status = false });
        //       }
        //   }

    }
}
