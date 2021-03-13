using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Product>>> Get([FromServices] DataContext context)
        {
            var products = await context.Products.ToListAsync();
            return products;
        }

        [HttpGet]
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
        [Route("")]
        public async Task<ActionResult<Product>> Post(
            [FromServices] DataContext context,
            [FromBody] Product body)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productAlreadyExists = await context.Products.AnyAsync(p => p.Title == body.Title);
            if (productAlreadyExists)
            {
                return BadRequest(new {message = "Já existe um produto com este nome."});
            }
            
            context.Products.Add(body);
            await context.SaveChangesAsync();
            
            Response.StatusCode = StatusCodes.Status201Created;
            
            return body;
        }

        [HttpPut]
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
