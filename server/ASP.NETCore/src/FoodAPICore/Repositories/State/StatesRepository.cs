
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodAPICore.Repositories;
using FoodAPICore.Entities;

namespace FoodAPICore.Repositories
{
    public class StatesRepository : IStatesRepository
    {
        private readonly FoodDbContext _Context;
        private readonly ILogger _Logger;

        public StatesRepository(FoodDbContext context, ILoggerFactory loggerFactory)
        {
            _Context = context;
            _Logger = loggerFactory.CreateLogger("StatesRepository");
        }

        public async Task<List<State>> GetStatesAsync()
        {
            return await _Context.States.OrderBy(s => s.Abbreviation).ToListAsync();
        }
    }
}
