using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Warehouse.Models;
using Warehouse.Service;
using Warehouse.Service.ProductRequest;

namespace Warehouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productService.GetProducts();
            return Ok(products.Where(p => p.Quantity > 0));
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(ProductCreateRequest request)
        {
            var result = await _productService.CreateProduct(request);
            if (result == 1) return Ok(result);

            return BadRequest();
        }

        [HttpPut("{id}/{capacity}")]
        public async Task<ActionResult<string>> SetProductCapacity(int id, long capacity)
        {
            if (capacity < 1) return BadRequest("Capacity should not less than or equal to zero");

            var request = new ProductSetCapacityRequest()
            {
                ProductId = id,
                Capacity = capacity
            };

            var result = await _productService.SetProductCapacity(request);
            if (result == 1) return Ok(id);

            return BadRequest("Capacity should be greater than quantity");
        }

        [HttpPut("{id}/recieve/{quantity}")]
        public async Task<ActionResult<string>> RecieveProduct(int id, long quantity)
        {
            if (quantity < 1) return BadRequest("Quantity should not less than or equal to zero");

            var request = new ProductSetQuantityRequest()
            {
                ProductId = id,
                Quantity = quantity
            };

            var result = await _productService.RecieveProduct(request);
            if (result == 1) return Ok(id);

            return BadRequest("Capacity should be greater than quantity");
        }

        [HttpPut("{id}/dispatch/{quantity}")]
        public async Task<ActionResult<string>> DispatchProduct(int id, long quantity)
        {
            if (quantity < 1) return BadRequest("Quantity should not less than or equal to zero");

            var request = new ProductSetQuantityRequest()
            {
                ProductId = id,
                Quantity = quantity
            };

            var result = await _productService.DispatchProduct(request);
            if (result == 1) return Ok(id);

            return BadRequest("Capacity should be greater than quantity");
        }
    }
}
