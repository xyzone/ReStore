using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> SortProduct(this IQueryable<Product> query, string orderBy){
            if(string.IsNullOrWhiteSpace(orderBy)) return query.OrderBy(p => p.Name);
             query = orderBy switch{
                "price" => query.OrderBy(p=>p.Price),
                "priceDesc" => query.OrderByDescending(p=>p.Price),
                _ => query.OrderBy(p=>p.Name)
            };
            return query;
        }

        public static IQueryable<Product> SearchProduct(this IQueryable<Product> query, string searchTerm){
            if(string.IsNullOrWhiteSpace(searchTerm)) return query; 
            return query.Where(p => p.Name.ToLower().Contains(searchTerm.Trim().ToLower()));
        }
        public static IQueryable<Product> filterProduct(this IQueryable<Product> query, string brands, string types){
             var brandList = new List<string>();
             var typeList = new List<string>();
             if(!string.IsNullOrEmpty(brands)) 
                brandList.AddRange(brands.ToLower().Split(",").ToList());
             if(!string.IsNullOrEmpty(types)) 
                typeList.AddRange(types.ToLower().Split(",").ToList());
            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));
            return query;

        }
        
    }
}