using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;

namespace Tests.Utils
{
    public class FakePolicyEvaluator : IPolicyEvaluator
    {
        public virtual async Task<AuthenticateResult> AuthenticateAsync(AuthorizationPolicy policy, HttpContext context)
        {
            var testScheme = "FakeScheme";
            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, "test"),
            };
            var identity = new ClaimsIdentity(claims, testScheme);
            var principal = new ClaimsPrincipal(identity);
            var properties = new AuthenticationProperties();
            var ticket = new AuthenticationTicket(principal, properties, testScheme);
            var result = AuthenticateResult.Success(ticket);
            return await Task.FromResult(result);
        }

        public virtual async Task<PolicyAuthorizationResult> AuthorizeAsync(AuthorizationPolicy policy,
            AuthenticateResult authenticationResult, HttpContext context, object resource)
        {
            return await Task.FromResult(PolicyAuthorizationResult.Success());
        }
    }


}