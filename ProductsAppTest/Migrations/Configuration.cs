namespace ProductsAppTest.Migrations
{
    using ProductsAppTest.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<ProductsAppTest.Models.ProductsAppTestContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ProductsAppTest.Models.ProductsAppTestContext context)
        {
            context.ShoppingLists.AddOrUpdate(
                new ShoppingList
                {
                    Name = "Groceries",
                    Items =
                    {
                        new Item{ Name = "Milk" },
                        new Item{ Name = "Tomatoes" },
                        new Item{ Name = "Oranges" }
                    }
                },
                new ShoppingList { Name = "Hardware" }
                );
        }
    }
}
