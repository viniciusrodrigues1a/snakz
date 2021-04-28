using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Models;

namespace WebApp.Controllers {
    public class DiscountRequest
    {
        public int Amount { get; set; }
        public int ProductId { get; set; }
    }
    
    public class DiscountUpdateRequest
    {
        public int Amount { get; set; }
    }
    
    [ApiController]
    [Route("discounts")]
    public class DiscountController : ControllerBase {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<Discount>>> GetAll([FromServices] DataContext context)
        {
            var discounts = await context.Discounts.ToListAsync();

            return discounts;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Discount>> GetById(
            [FromServices] DataContext context,
            int id)
        {
            var discount = await context.Discounts.FirstOrDefaultAsync(d => d.Id == id);

            if (discount == null)
            {
                return NotFound(new { Message = "Desconto não encontrado." });
            }

            return discount;
        }
        
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Discount>> Post(
            [FromServices] DataContext context,
            [FromBody] DiscountRequest body)
        {
            var discountAlreadyExists = await context.Discounts.AnyAsync(d => d.ProductId == body.ProductId);
            if (discountAlreadyExists)
            {
                return BadRequest(new { Message = "Produto já possui um desconto ativo." });
            }

            if (body.Amount <= 0)
            {
                return BadRequest(new { Message = "Valor deve ser maior que 0." });
            }

            var product = await context.Products.AnyAsync(p => p.Id == body.ProductId);
            if (!product)
            {
                return BadRequest(new { Message = "Produto inexistente." });
            }
            
            var discount = new Discount() { Amount = body.Amount, ProductId = body.ProductId };

            context.Discounts.Add(discount);
            await context.SaveChangesAsync();

            return Created("GetDiscount", discount);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult> Put(
            [FromServices] DataContext context,
            [FromBody] DiscountUpdateRequest body,
            int id)
        {
            var discount = await context.Discounts.FirstOrDefaultAsync(d => d.Id == id);
            if (discount == null) {
                return BadRequest(new {message = "Desconto não existe."});
            }

            if (body.Amount <= 0)
            {
                return BadRequest(new { Message = "Valor deve ser maior que 0." });
            }

            discount.Amount = body.Amount;

            context.Discounts.Attach(discount);
            context.Entry(discount).State = EntityState.Modified;
            await context.SaveChangesAsync();
            
            return Ok();
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult> Delete(
            [FromServices] DataContext context,
            int id)
        {
            var discount = await context.Discounts.FirstOrDefaultAsync(d => d.Id == id);

            if (discount == null)
            {
                return NotFound(new {message = "Desconto não encontrado."});
            }
            
            context.Discounts.Remove(discount);
            await context.SaveChangesAsync();

            return Ok();
        }
    }
}