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

        public int CreateProduct(ProductCreateRequest request)
        {
            var newProduct = new Product() {
                ProductName = request.ProductName,
                Capacity = request.Capacity,
                Quantity = request.Quantity
            };
            _context.Products.Add(newProduct);

            if (Save())
                return newProduct.ProductId;

            return 0;
        }

        public ICollection<Product> GetProducts()
        {
            return _context.Products.OrderBy(n => n.ProductName).ToList();
        }

        public Product GetProduct(int productId)
        {
            return _context.Products.FirstOrDefault(n => n.ProductId == productId);
        }

        public bool SetProductCapacity(Product product, long capacity)
        {
            product.Capacity = capacity;
            _context.Products.Update(product);

            return UpdateProduct(product);
        }

        public bool RecieveProduct(Product product, long quantity)
        {
            product.Quantity += quantity;
            _context.Products.Update(product);

            return UpdateProduct(product);
        }

        public bool DispatchProduct(Product product, long quantity)
        {
            product.Quantity -= quantity;
            _context.Products.Update(product);

            return UpdateProduct(product);
        }

        public bool IsProductExists(string name)
        {
            return _context.Products.Any(n => n.ProductName.ToLower().Trim() == name.ToLower().Trim());
        }

        public bool IsProductExists(int id)
        {
            return _context.Products.Any(n => n.ProductId == id);
        }

        public bool DeleteById(int id)
        {
            var product = GetProduct(id);
            if(product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            return Save();
        }

        public bool UpdateProduct(Product product, ProductUpdateRequest payload = null)
        {
            if(payload != null)
            {
                product.Capacity = payload.Capacity;
                product.ProductName = payload.ProductName;
                product.Quantity = payload.Quantity;
            }

            _context.Products.Update(product);
            return Save();

        }

        private bool Save()
        {
            return _context.SaveChanges() < 0 ? false : true;
        }


    }
}
