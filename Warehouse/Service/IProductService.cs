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
        Task<int> SetProductCapacity(ProductSetCapacityRequest request);
        Task<int> RecieveProduct(ProductSetQuantityRequest request);
        Task<int> DispatchProduct(ProductSetQuantityRequest request);
    }
}
