using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FoodAPICore.Entities;
using FoodAPICore.Repositories;

namespace FoodAPICore.Controllers
{
    [Route("api/[controller]")]
    public class StatesApiController : Controller
    {
        IStatesRepository _StatesRepository;
        ILogger _Logger;

        public StatesApiController(IStatesRepository statesRepo, ILoggerFactory loggerFactory) {
            _StatesRepository = statesRepo;
            _Logger = loggerFactory.CreateLogger(nameof(StatesApiController));
        }

        [HttpGet]
    //    [NoCache]
        [ProducesResponseType(typeof(List<State>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> States() {
            try
            {
                var states = await _StatesRepository.GetStatesAsync();
                return Ok(states);
            }
            catch (Exception exp)
            {
                _Logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

    }
}
