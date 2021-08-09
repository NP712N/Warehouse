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
        bool CreateProduct(Product product);
        bool UpdateProduct(Product product);
        bool SetProductCapacity(Product product, long capacity);
        bool RecieveProduct(Product product, long quantity);
        bool DispatchProduct(Product product, long quantity);
        bool IsProductExists(string name);
        bool IsProductExists(int id);
    }
}
