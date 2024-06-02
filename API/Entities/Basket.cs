using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product prod, int qty)
        {
            if (Items.All(item => item.ProductId != prod.Id))
            {
                Items.Add(new BasketItem { Product = prod, Quantity = qty });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == prod.Id);
            if(existingItem != null) existingItem.Quantity += qty;

        }

        public void RemoveItem(int productId, int qty)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= qty;
            if(item.Quantity <= 0) Items.Remove(item);

        }
    }

}