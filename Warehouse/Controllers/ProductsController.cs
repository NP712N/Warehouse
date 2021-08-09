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
        public IActionResult GetProducts()
        {
            var list = _productService.GetProducts();
            return Ok(list);
        }

        [HttpGet("{productId}", Name = "GetProduct")]
        public IActionResult GetProduct(int productId)
        {
            var product = _productService.GetProduct(productId);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }


        [HttpPost]
        public IActionResult CreateProduct([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest(ModelState);
            }

            if (!_productService.CreateProduct(product))
            {
                ModelState.AddModelError("", $"Something went wrong when adding {product.ProductName}");
                return StatusCode(500, ModelState);
            }

            return CreatedAtRoute("GetProduct", new { productId = product.ProductId }, product);
        }

        [HttpPatch("{id}/{capacity}")]
        public IActionResult SetProductCapacity(int id, long capacity)
        {
            if (capacity < 1)
            {
                ModelState.AddModelError("", "Capacity should not less than or equal to zero");
                return StatusCode(404, ModelState);
            }

            var product = _productService.GetProduct(id);
            if (product == null)
            {
                ModelState.AddModelError("", "Product is not exists!");
                return BadRequest(ModelState);
            }

            if (product.Quantity > capacity)
            {
                ModelState.AddModelError("", "Capacity should be greater than quantity");
                return StatusCode(404, ModelState);
            }

            if (!_productService.SetProductCapacity(product, capacity))
            {
                ModelState.AddModelError("", $"Something went wrong when set product capapcity {product.ProductName}");
                return StatusCode(500, ModelState);
            }

            return Ok(id);
        }

        [HttpPatch("{id}/recieve/{quantity}")]
        public IActionResult RecieveProduct(int id, long quantity)
        {
            if (quantity < 1)
            {
                ModelState.AddModelError("", "Quantity should not less than or equal to zero");
                return StatusCode(404, ModelState);
            }

            var product = _productService.GetProduct(id);
            if (product == null)
            {
                ModelState.AddModelError("", "Product is not exists!");
                return BadRequest(ModelState);
            }

            if (product.Capacity < quantity)
            {
                ModelState.AddModelError("", "Capacity should be greater than quantity");
                return StatusCode(404, ModelState);
            }

            if (!_productService.RecieveProduct(product, quantity))
            {
                ModelState.AddModelError("", $"Something went wrong when recieving product {product.ProductName}");
                return StatusCode(500, ModelState);
            }

            return Ok(id);
        }

        [HttpPatch("{id}/dispatch/{quantity}")]
        public IActionResult DispatchProduct(int id, long quantity)
        {
            if (quantity < 1)
            {
                ModelState.AddModelError("", "Quantity should not less than or equal to zero");
                return StatusCode(404, ModelState);
            }

            var product = _productService.GetProduct(id);
            if (product == null)
            {
                ModelState.AddModelError("", "Product is not exists!");
                return BadRequest(ModelState);
            }

            if (product.Capacity < quantity)
            {
                ModelState.AddModelError("", "Capacity should be greater than quantity");
                return StatusCode(404, ModelState);
            }

            if (!_productService.DispatchProduct(product, quantity))
            {
                ModelState.AddModelError("", $"Something went wrong when dispatching product {product.ProductName}");
                return StatusCode(500, ModelState);
            }

            return Ok(id);
        }

        //TODO: Add validation to make code reuseable
    }
}
