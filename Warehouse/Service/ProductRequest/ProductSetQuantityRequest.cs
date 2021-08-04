using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Warehouse.Service.ProductRequest
{
    public class ProductSetQuantityRequest
    {
        public int ProductId { get; set; }
        public long Quantity { get; set; }
    }
}
