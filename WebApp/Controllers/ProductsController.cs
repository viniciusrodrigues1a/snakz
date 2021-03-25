using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Models;
using WebApp.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        private IWebHostEnvironment _env;
        public ProductsController(IWebHostEnvironment env)
        {
            _env = env;
            
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Product>>> Get([FromServices] DataContext context)
        {
            var products = await context.Products.ToListAsync();
            return products;
        }

        [HttpGet]
        [Authorize]
        [Route("{id:int}")]
        public async Task<ActionResult<Product>> GetById(
            [FromServices] DataContext context,
            int id)
        {
            var product = await context.Products.FirstOrDefaultAsync(p => p.Id == id);
            
            if (product == null)
            {
                return NotFound(new {message = "Produto não encontrado."});
            }
            
            return product;
        }
        
        [HttpPost]
        [Authorize]
        [Route("")]
        public async Task<ActionResult<Product>> Post(
            [FromServices] DataContext context,
            [FromForm] IFormCollection data,
            IFormFile file)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var title = data["title"].ToString();
            var description = data["description"].ToString();
            var price = data["price"].ToString();

            if (title == "" ||
                description == "" ||
                price == "")
            {
                return BadRequest(new {message = "Formato inválido."});
            }

            var productAlreadyExists = await context.Products.AnyAsync(p => p.Title == title);
            if (productAlreadyExists)
            {
                return BadRequest(new {message = "Já existe um produto com este nome."});
            }

            string imageUrl = "";
            if (file != null)
            {
                var baseUrl = $"{this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}";
                var staticUploadsUrl = $"{baseUrl}/Uploads/";
                var fileName = new ProductFile(file, _env.ContentRootPath).FileName;
                imageUrl = $"{staticUploadsUrl}{fileName}";
                Console.WriteLine(imageUrl);
            }

            var product = new Product { 
                Title = title,
                Description = description,
                Price = Int32.Parse(price),
                ImageUrl = imageUrl 
            };
            
            context.Products.Add(product);
            await context.SaveChangesAsync();
            
            Response.StatusCode = StatusCodes.Status201Created;
            return product;
        }

        [HttpPut]
        [Authorize]
        [Route("{id:int}")]
        public async Task<ActionResult<Product>> Put(
            [FromServices] DataContext context,
            [FromBody] Product body,
            int id)
        {
            var productWithNewTitleAlreadyExists= await context.Products.AnyAsync(p => p.Title == body.Title);
            if (productWithNewTitleAlreadyExists)
            {
                return BadRequest(new {message = "Já existe um produto com este nome."});
            }
            
            var product = new Product
            {
                Id = id, 
                Title = body.Title, 
                Description = body.Description, 
                Price = body.Price
            };
            context.Products.Attach(product);
            context.Entry(product).State = EntityState.Modified;
            await context.SaveChangesAsync();
            
            return NoContent();
        }

        [HttpPatch]
        [Authorize]
        [Route("{id:int}")]
        public async Task<ActionResult> Patch(
            [FromServices] DataContext context,
            [FromBody] JsonPatchDocument<Product> patchProduct,
            int id)
        {
            if (patchProduct == null)
            {
                return BadRequest();
            }

            var product = await context.Products.FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound(new {message = "Produto não encontrado."});
            }
            
            patchProduct.ApplyTo(product, ModelState);

            var productWithNewTitleAlreadyExists = await context.Products.AnyAsync(p => p.Title == product.Title);
            if (productWithNewTitleAlreadyExists)
            {
                return BadRequest(new {message = "Já existe um produto com este nome."});
            }

            if (!TryValidateModel(product))
            {
                return BadRequest(ModelState);
            }

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]
        public async Task<ActionResult> Delete(
            [FromServices] DataContext context,
            int id)
        {
            var product = await context.Products.FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound(new {message = "Produto não encontrado."});
            }
            
            context.Products.Remove(product);
            await context.SaveChangesAsync();
            
            return Ok();
        }
    }
}
