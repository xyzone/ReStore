using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;

        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBacket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return MapBasketToDTO(basket);
        }

        private static ActionResult<BasketDTO> MapBasketToDTO(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity

                }
                            ).ToList()
            };
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                        .Include(b => b.Items)
                        .ThenInclude(b1 => b1.Product)
                        .FirstOrDefaultAsync(b2 => b2.BuyerId == Request.Cookies["buyerId"]);
        }



        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOption = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("buyerId", buyerId, cookieOption);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;

        }
        [HttpPost] // api/basket/?productId=xxx&qty=2
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int qty)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(product, qty);

            var result = await _context.SaveChangesAsync() > 0;
            // if (result) return CreatedAtRoute("GetBasket", MapBasketToDTO(basket));
            if(result) return MapBasketToDTO(basket);
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }
        
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int qty)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return null;
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.RemoveItem(productId, qty);
            var result = await _context.SaveChangesAsync() > 0;
            // if(result) return MapBasketToDTO(basket);
            if (result) return StatusCode(201);
            return BadRequest(new ProblemDetails { Title = "Problem removing item to basket" });
        } 
    }
}