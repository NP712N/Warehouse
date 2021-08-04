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
            return Ok(products);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(ProductCreateRequest request)
        {
            var productId = await _productService.CreateProduct(request);
            if (productId > 0) return Ok(productId);

            return BadRequest();
        }

        [HttpPut("{id}/{capacity}")]
        public async Task<ActionResult<Product>> SetProductCapacity(int id, long capacity)
        {
            var request = new ProductSetCapacityRequest() {
                ProductId = id,
                Capacity = capacity
            };

            var product = await _productService.SetProductCapacity(request);
            if (product.Capacity == request.Capacity) return Ok(product);

            return BadRequest();
        }

        [HttpPut("{id}/recieve/{quantity}")]
        public async Task<ActionResult<Product>> RecieveProduct(int id, long quantity)
        {
            var request = new ProductSetQuantityRequest() {
                ProductId = id,
                Quantity = quantity
            };

            var product = await _productService.RecieveProduct(request);
            return Ok(product);
        }

        [HttpPut("{id}/dispatch/{quantity}")]
        public async Task<ActionResult<Product>> DispatchProduct(int id, long quantity)
        {
            var request = new ProductSetQuantityRequest()
            {
                ProductId = id,
                Quantity = quantity
            };

            var product = await _productService.DispatchProduct(request);
            return Ok(product);
        }
    }
}
