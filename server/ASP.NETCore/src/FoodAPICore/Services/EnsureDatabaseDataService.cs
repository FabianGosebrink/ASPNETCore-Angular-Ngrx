using FoodAPICore.Dtos;
using FoodAPICore.Entities;
using IdentityModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;

namespace FoodAPICore.Services
{
    public class EnsureDatabaseDataService : IEnsureDatabaseDataService
    {
        FoodDbContext _context;
        public async Task EnsureSeedData(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ILoggerFactory loggerFactory,
            FoodDbContext context)
        {
            _context = context;

            context.Database.EnsureCreated();           

            if (context.Users.Any())
            {
                return; // Db has been seeded.
            }
            await AddUserNotes();
            //context.Users.RemoveRange(context.Users);
            //context.SaveChanges();

            await AddPeriodicElements();

            // Creates Roles.
            await roleManager.CreateAsync(new IdentityRole("administrator"));
            await roleManager.CreateAsync(new IdentityRole("user"));

            // Adds Roles to Role Claims.
            var adminRole = await roleManager.FindByNameAsync("administrator");
            var userRole = await roleManager.FindByNameAsync("user");
            await roleManager.AddClaimAsync(adminRole, new Claim(JwtClaimTypes.Role, "administrator"));
            await roleManager.AddClaimAsync(userRole, new Claim(JwtClaimTypes.Role, "user"));

            // Seeds an admin user.
            var user = new IdentityUser
            {
                AccessFailedCount = 0,
                Email = "admin@gmail.com",
                EmailConfirmed = false,
                LockoutEnabled = true,
                NormalizedEmail = "ADMIN@GMAIL.COM",
                NormalizedUserName = "ADMIN@GMAIL.COM",
                TwoFactorEnabled = false,
                UserName = "admin"
            };
            // password admin
            var result = await userManager.CreateAsync(user, "password");

            if (result.Succeeded)
            {
                var adminUser = await userManager.FindByNameAsync(user.UserName);
                // Assigns the 'administrator' role.
                await userManager.AddToRoleAsync(adminUser, "administrator");
                // Assigns claims.
                var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.Name, value: user.UserName),
                    new Claim(type: JwtClaimTypes.Email, value: user.Email),
                };
                await userManager.AddClaimsAsync(adminUser, claims);
            }
            user = new IdentityUser
            {
                AccessFailedCount = 0,
                Email = "user@gmail.com",
                EmailConfirmed = false,
                LockoutEnabled = true,
                NormalizedEmail = "user@GMAIL.COM",
                NormalizedUserName = "user@GMAIL.COM",
                TwoFactorEnabled = false,
                UserName = "user"
            };
            // password admin
            result = await userManager.CreateAsync(user, "password");

            if (result.Succeeded)
            {
                user = await userManager.FindByNameAsync(user.UserName);
                // Assigns the 'administrator' role.
                await userManager.AddToRoleAsync(user, "user");
                // Assigns claims.
                var claims = new List<Claim> {
                    new Claim(type: JwtClaimTypes.Name, value: user.UserName),
                    new Claim(type: JwtClaimTypes.Email, value: user.Email),
                };
                await userManager.AddClaimsAsync(user, claims);
            }

            context.FoodItems.Add(new FoodItem() { Calories = 1000, Name = "Lasagne", Created = DateTime.Now });
            context.FoodItems.Add(new FoodItem() { Calories = 1100, Name = "Hamburger", Created = DateTime.Now });
            context.FoodItems.Add(new FoodItem() { Calories = 1200, Name = "Spaghetti", Created = DateTime.Now });
            context.FoodItems.Add(new FoodItem() { Calories = 1300, Name = "Pizza", Created = DateTime.Now });

            context.SaveChanges();

            var foodItem = context.FoodItems.FirstOrDefault();
            context.Add(new Ingredient() {  FoodItem = foodItem,  Quantity=1, Weight=2,  Description="meat ball" });
            context.Add(new Ingredient() { FoodItem = foodItem, Quantity = 2, Weight =3, Description = "suage ball" });
            context.SaveChanges();


            var states = GetStates();
            context.States.AddRange(states);
            try
            {
                int numAffected = context.SaveChanges();
            }
            catch (Exception exp)
            {
                throw;
            }
            context.Customers.RemoveRange(context.Customers);
            context.SaveChanges();

            var customers = GetCustomers(states);
            context.Customers.AddRange(customers);

            try
            {
                int numAffected = context.SaveChanges();
            }
            catch (Exception exp)
            {
                throw;
            }

        }
        private async Task AddUserNotes()
        {
            var jsonText = File.ReadAllText("./Services/userNotes.json");
            var users = JsonConvert.DeserializeObject<List<UserNotesDto>>(jsonText);
            foreach (var usernote in users)
            {
                var ns = new List<Note>();

                foreach (var n in usernote.Notes)
                {
                    ns.Add(new Note {title=n.title, date=n.date });
                }
                var u = new User
                {
                 //   id = usernote.id,
                    bio = usernote.bio,
                    name = usernote.name,
                    birthDate = usernote.birthDate,
                    avatar = usernote.avatar,
                    Notes = ns
                };

                _context.Users.Add(u);
                _context.SaveChanges();
            }
        }
        private async Task AddPeriodicElements()
        {
            var jsonText = File.ReadAllText("./Services/PeriodicElements.json");
            var periodicElements = JsonConvert.DeserializeObject<List<PeriodicElementDto>>(jsonText);

            foreach (var item in periodicElements)
            {         
                var u = new PeriodicElement
                {
                    position = item.position,                
                    name = item.name,
                    weight = item.weight,
                    symbol = item.symbol,
                };
                _context.PeriodicElements.Add(u);
            }
            _context.SaveChanges();
        }
        static List<Customer> GetCustomers(List<State> states)
        {
            //Customers
            var customerNames = new string[]
            {
                "Marcus,HighTower,Male,acmecorp.com",
                "Jesse,Smith,Female,gmail.com",
                "Albert,Einstein,Male,outlook.com",
                "Dan,Wahlin,Male,yahoo.com",
                "Ward,Bell,Male,gmail.com",
                "Brad,Green,Male,gmail.com",
                "Igor,Minar,Male,gmail.com",
                "Miško,Hevery,Male,gmail.com",
                "Michelle,Avery,Female,acmecorp.com",
                "Heedy,Wahlin,Female,hotmail.com",
                "Thomas,Martin,Male,outlook.com",
                "Jean,Martin,Female,outlook.com",
                "Robin,Cleark,Female,acmecorp.com",
                "Juan,Paulo,Male,yahoo.com",
                "Gene,Thomas,Male,gmail.com",
                "Pinal,Dave,Male,gmail.com",
                "Fred,Roberts,Male,outlook.com",
                "Tina,Roberts,Female,outlook.com",
                "Cindy,Jamison,Female,gmail.com",
                "Robyn,Flores,Female,yahoo.com",
                "Jeff,Wahlin,Male,gmail.com",
                "Danny,Wahlin,Male,gmail.com",
                "Elaine,Jones,Female,yahoo.com",
                "John,Papa,Male,gmail.com"
            };
            var addresses = new string[]
            {
                "1234 Anywhere St.",
                "435 Main St.",
                "1 Atomic St.",
                "85 Cedar Dr.",
                "12 Ocean View St.",
                "1600 Amphitheatre Parkway",
                "1604 Amphitheatre Parkway",
                "1607 Amphitheatre Parkway",
                "346 Cedar Ave.",
                "4576 Main St.",
                "964 Point St.",
                "98756 Center St.",
                "35632 Richmond Circle Apt B",
                "2352 Angular Way",
                "23566 Directive Pl.",
                "235235 Yaz Blvd.",
                "7656 Crescent St.",
                "76543 Moon Ave.",
                "84533 Hardrock St.",
                "5687534 Jefferson Way",
                "346346 Blue Pl.",
                "23423 Adams St.",
                "633 Main St.",
                "899 Mickey Way"
            };

            var citiesStates = new string[]
            {
                "Phoenix,AZ,Arizona",
                "Encinitas,CA,California",
                "Seattle,WA,Washington",
                "Chandler,AZ,Arizona",
                "Dallas,TX,Texas",
                "Orlando,FL,Florida",
                "Carey,NC,North Carolina",
                "Anaheim,CA,California",
                "Dallas,TX,Texas",
                "New York,NY,New York",
                "White Plains,NY,New York",
                "Las Vegas,NV,Nevada",
                "Los Angeles,CA,California",
                "Portland,OR,Oregon",
                "Seattle,WA,Washington",
                "Houston,TX,Texas",
                "Chicago,IL,Illinois",
                "Atlanta,GA,Georgia",
                "Chandler,AZ,Arizona",
                "Buffalo,NY,New York",
                "Albuquerque,AZ,Arizona",
                "Boise,ID,Idaho",
                "Salt Lake City,UT,Utah",
                "Orlando,FL,Florida"
            };

            var citiesIds = new int[] { 5, 9, 44, 5, 36, 17, 16, 9, 36, 14, 14, 6, 9, 24, 44, 36, 25, 19, 5, 14, 5, 23, 38, 17 };
            var zip = 85229;

            var orders = new List<Order>
            {
                new Order { Product = "Basket", Price = 29.99M, Quantity = 1 },
                new Order { Product = "Yarn", Price = 9.99M, Quantity = 1 },
                new Order { Product = "Needes", Price = 5.99M, Quantity = 1 },
                new Order { Product = "Speakers", Price = 499.99M, Quantity = 1 },
                new Order { Product = "iPod", Price = 399.99M, Quantity = 1 },
                new Order { Product = "Table", Price = 329.99M, Quantity = 1 },
                new Order { Product = "Chair", Price = 129.99M, Quantity = 4 },
                new Order { Product = "Lamp", Price = 89.99M, Quantity = 5 },
                new Order { Product = "Call of Duty", Price = 59.99M, Quantity = 1 },
                new Order { Product = "Controller", Price = 49.99M, Quantity = 1 },
                new Order { Product = "Gears of War", Price = 49.99M, Quantity = 1 },
                new Order { Product = "Lego City", Price = 49.99M, Quantity = 1 },
                new Order { Product = "Baseball", Price = 9.99M, Quantity = 5 },
                new Order { Product = "Bat", Price = 19.99M, Quantity = 1 }
            };

            int firstOrder, lastOrder, tempOrder = 0;
            var ordersLength = orders.Count;
            var customers = new List<Customer>();
            var random = new Random();

            for (var i = 0; i < customerNames.Length; i++)
            {
                var nameGenderHost = customerNames[i].Split(',');
                var cityState = citiesStates[i].Split(',');
                var state = states.Where(s => s.Abbreviation == cityState[1]).SingleOrDefault();

                var customer = new Customer
                {
                    FirstName = nameGenderHost[0],
                    LastName = nameGenderHost[1],
                    Email = nameGenderHost[0] + '.' + nameGenderHost[1] + '@' + nameGenderHost[3],
                    Address = addresses[i],
                    City = cityState[0],
                    State = state,
                    Zip = zip + i,
                    Gender = nameGenderHost[2],
                    OrderCount = 0
                };

                firstOrder = (int)Math.Floor(random.NextDouble() * orders.Count);
                lastOrder = (int)Math.Floor(random.NextDouble() * orders.Count);

                if (firstOrder > lastOrder)
                {
                    tempOrder = firstOrder;
                    firstOrder = lastOrder;
                    lastOrder = tempOrder;
                }

                customer.Orders = new List<Order>();

                for (var j = firstOrder; j <= lastOrder && j < ordersLength; j++)
                {
                    var order = new Order
                    {
                        Product = orders[j].Product,
                        Price = orders[j].Price,
                        Quantity = orders[j].Quantity
                    };
                    customer.Orders.Add(order);
                }
                customer.OrderCount = customer.Orders.Count;
                customers.Add(customer);
            }

            return customers;
        }

        static List<State> GetStates()
        {
            var states = new List<State>
            {
                new State { Name = "Alabama", Abbreviation = "AL" },
                new State { Name = "Montana", Abbreviation = "MT" },
                new State { Name = "Alaska", Abbreviation = "AK" },
                new State { Name = "Nebraska", Abbreviation = "NE" },
                new State { Name = "Arizona", Abbreviation = "AZ" },
                new State { Name = "Nevada", Abbreviation = "NV" },
                new State { Name = "Arkansas", Abbreviation = "AR" },
                new State { Name = "New Hampshire", Abbreviation = "NH" },
                new State { Name = "California", Abbreviation = "CA" },
                new State { Name = "New Jersey", Abbreviation = "NJ" },
                new State { Name = "Colorado", Abbreviation = "CO" },
                new State { Name = "New Mexico", Abbreviation = "NM" },
                new State { Name = "Connecticut", Abbreviation = "CT" },
                new State { Name = "New York", Abbreviation = "NY" },
                new State { Name = "Delaware", Abbreviation = "DE" },
                new State { Name = "North Carolina", Abbreviation = "NC" },
                new State { Name = "Florida", Abbreviation = "FL" },
                new State { Name = "North Dakota", Abbreviation = "ND" },
                new State { Name = "Georgia", Abbreviation = "GA" },
                new State { Name = "Ohio", Abbreviation = "OH" },
                new State { Name = "Hawaii", Abbreviation = "HI" },
                new State { Name = "Oklahoma", Abbreviation = "OK" },
                new State { Name = "Idaho", Abbreviation = "ID" },
                new State { Name = "Oregon", Abbreviation = "OR" },
                new State { Name = "Illinois", Abbreviation = "IL" },
                new State { Name = "Pennsylvania", Abbreviation = "PA" },
                new State { Name = "Indiana", Abbreviation = "IN" },
                new State { Name = "Rhode Island", Abbreviation = "RI" },
                new State { Name = "Iowa", Abbreviation = "IA" },
                new State { Name = "South Carolina", Abbreviation = "SC" },
                new State { Name = "Kansas", Abbreviation = "KS" },
                new State { Name = "South Dakota", Abbreviation = "SD" },
                new State { Name = "Kentucky", Abbreviation = "KY" },
                new State { Name = "Tennessee", Abbreviation = "TN" },
                new State { Name = "Louisiana", Abbreviation = "LA" },
                new State { Name = "Texas", Abbreviation = "TX" },
                new State { Name = "Maine", Abbreviation = "ME" },
                new State { Name = "Utah", Abbreviation = "UT" },
                new State { Name = "Maryland", Abbreviation = "MD" },
                new State { Name = "Vermont", Abbreviation = "VT" },
                new State { Name = "Massachusetts", Abbreviation = "MA" },
                new State { Name = "Virginia", Abbreviation = "VA" },
                new State { Name = "Michigan", Abbreviation = "MI" },
                new State { Name = "Washington", Abbreviation = "WA" },
                new State { Name = "Minnesota", Abbreviation = "MN" },
                new State { Name = "West Virginia", Abbreviation = "WV" },
                new State { Name = "Mississippi", Abbreviation = "MS" },
                new State { Name = "Wisconsin", Abbreviation = "WI" },
                new State { Name = "Missouri", Abbreviation = "MO" },
                new State { Name = "Wyoming", Abbreviation = "WY" }
            };
            return states;
        }
    }
}
