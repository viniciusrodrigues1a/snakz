using System.Security.Claims;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using WebApp.Data;
using WebApp.Utils;
using Microsoft.AspNetCore.Http;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SessionsController : ControllerBase
    {
        [HttpPost]
        [Route("")]
        public async Task<ActionResult> Post(
            [FromServices] DataContext context,
            [FromForm] string username,
            [FromForm] string password)
        {
            var user = await context
                .Users
                .FirstOrDefaultAsync(u => u.Username == username);

            if (user == null)
            {
                return BadRequest(new { message = "Usuário inválido." });
            }

            if (!PasswordEncryption.IsStringEqualToHash(password, user.Password, user.Salt))

            {
                return BadRequest(new { message = "Senha inválida." });
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            var userIdentity = new ClaimsIdentity(claims, "login");
            var principal = new ClaimsPrincipal(userIdentity);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return Ok();
        }

        [HttpGet]
        [Route("")]
        [Authorize]
        public OkResult Get() => Ok();
    }
}
