using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Warehouse.Models;
using Warehouse.Service.ProductRequest;

namespace Warehouse.Service
{
    public interface IProductService
    {
        Task<int> CreateProduct(ProductCreateRequest request);
        Task<List<Product>> GetProducts();
        Task<Product> SetProductCapacity(ProductSetCapacityRequest request);
        Task<Product> RecieveProduct(ProductSetQuantityRequest request);
    }
}
