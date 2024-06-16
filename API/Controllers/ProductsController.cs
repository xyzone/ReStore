using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{ 
    public class ProductsController(StoreContext context1) : BaseApiController
    {
        private readonly StoreContext _context1 = context1;

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProjects([FromQuery]ProductParams productParams){
            var query = _context1.Products
            .SearchProduct(productParams.SearchTerms)
            .SortProduct(productParams.OrderBy)
            .filterProduct(productParams.Brands, productParams.Types)
            .AsQueryable();
           
            var products = await PagedList<Product>.ToPageList(query, productParams.PageNumber, 
            productParams.PageSize); 
            Response.AddPaginationHeader(products.TheMetaData);
            return products;
     
        }

        [HttpGet("{id}")]  // api/product/3
        public async Task<ActionResult<Product>> GetProduct(int id){
            var product = await _context1.Products.FindAsync(id);
            if(product == null){return NotFound();};
            return product;
        }

        [HttpGet("filters")]  // api/product/3
        public async Task<IActionResult> GetFilter()
        {
            var brands = await _context1.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await _context1.Products.Select(p => p.Type).Distinct().ToListAsync();
            return Ok(new {brands, types});

        }
    }
}