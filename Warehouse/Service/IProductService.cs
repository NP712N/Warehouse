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
        ICollection<Product> GetProducts();
        Product GetProduct(int productId);
        int CreateProduct(ProductCreateRequest request);
        bool UpdateProduct(Product product, ProductUpdateRequest payload = null);
        bool DeleteById(int id);
        bool SetProductCapacity(Product product, long capacity);
        bool RecieveProduct(Product product, long quantity);
        bool DispatchProduct(Product product, long quantity);
        bool IsProductExists(string name);
        bool IsProductExists(int id);
    }
}
