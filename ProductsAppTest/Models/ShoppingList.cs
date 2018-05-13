using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductsAppTest.Models
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Item> Items { get; set; }

        public ShoppingList()
        {
            Id = -1;
            Name = string.Empty;
            Items = new List<Item>();
        }
    }
}