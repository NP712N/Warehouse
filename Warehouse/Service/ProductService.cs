using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Warehouse.Models;
using Warehouse.Service.ProductRequest;

namespace Warehouse.Service
{
    public class ProductService : IProductService
    {
        private readonly ProductDbContext _context;
        public ProductService(ProductDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateProduct(ProductCreateRequest request)
        {
            var product = new Product()
            {
                ProductName = request.ProductName,
                Capacity = request.Capacity,
                Quantity = request.Quantity
            };

            _context.Products.Add(product);
            return await _context.SaveChangesAsync();
        }

        public async Task<List<Product>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<int> SetProductCapacity(ProductSetCapacityRequest request)
        {
            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null) return 0;
            if (request.Capacity < product.Quantity) return 2;

            product.Capacity = request.Capacity;
            _context.Products.Update(product);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> RecieveProduct(ProductSetQuantityRequest request)
        {
            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null) return 0;

            product.Quantity += request.Quantity;
            if (product.Quantity > product.Capacity) return 2;

            _context.Products.Update(product);

            return await _context.SaveChangesAsync();
        }

        public async Task<int> DispatchProduct(ProductSetQuantityRequest request)
        {
            var product = await _context.Products.FindAsync(request.ProductId);
            if (product == null) return 0;

            product.Quantity -= request.Quantity;
            if (product.Quantity > product.Capacity) return 2;

            _context.Products.Update(product);

            return await _context.SaveChangesAsync();
        }

    }
}
