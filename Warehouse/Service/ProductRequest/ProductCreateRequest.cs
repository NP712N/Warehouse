using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Warehouse.Service.ProductRequest
{
    public class ProductCreateRequest
    {
        public string ProductName { set; get; }
        public long Capacity { set; get; }
        public long Quantity { set; get; }
    }
}
