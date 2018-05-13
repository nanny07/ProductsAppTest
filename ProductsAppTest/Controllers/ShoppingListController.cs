using ProductsAppTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProductsAppTest.Controllers
{
    public class ShoppingListController : ApiController
    {
        List<ShoppingList> shoppingLists = new List<ShoppingList>()
        {
            new ShoppingList()
            {
                Id = 0, Name = "Groceries", Items = new List<Item>()
                {
                    new Item { Id = 0, Name = "Milk", ShoppingListId = 0 },
                    new Item { Id = 1, Name = "Tomatoes", ShoppingListId = 0 },
                    new Item { Id = 2, Name = "Oranges", ShoppingListId = 0 }
                }
            },
            new ShoppingList() { Id = 1, Name = "Hardware" }
        };


        // GET: api/ShoppingList
        public IEnumerable<ShoppingList> Get()
        {
            return shoppingLists;
        }

        // GET: api/ShoppingList/5
        public IHttpActionResult Get(int id)
        {
            ShoppingList shoppingList = shoppingLists.FirstOrDefault(s => s.Id == id);
            if(shoppingList == null)
            {
                return NotFound();
            }

            return Ok(shoppingList);
        }

        // POST: api/ShoppingList
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/ShoppingList/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ShoppingList/5
        public void Delete(int id)
        {
        }
    }
}
