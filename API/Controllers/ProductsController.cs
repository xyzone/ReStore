using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{ 
    public class ProductsController(StoreContext context1) : BaseApiController
    {
        private readonly StoreContext _context1 = context1;

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProjects(){
            return await _context1.Products.ToListAsync();
     
        }

        [HttpGet("{id}")]  // api/product/3
        public async Task<ActionResult<Product>> GetProduct(int id){
            var product = await _context1.Products.FindAsync(id);
            if(product == null){return NotFound();};
            return product;
        }
    }
}