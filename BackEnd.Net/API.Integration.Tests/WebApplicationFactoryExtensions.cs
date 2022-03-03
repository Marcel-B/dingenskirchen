using IdentityModel;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Security.Claims;

namespace API.IntegrationTests
{
    public static class WebApplicationFactoryExtensions
    {
        public static WebApplicationFactory<TEntryPoint> ConfigureAuth<TEntryPoint>(
            this WebApplicationFactory<TEntryPoint> factory) where TEntryPoint : class
        {
            return factory
                .WithWebHostBuilder(builder =>
                {
                    builder
                        .ConfigureTestAuthentication(
                            "TestAuth",
                            CreateAuthenticateResult);
                });
        }

        private static AuthenticateResult CreateAuthenticateResult(HttpContext httpContext)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Role, "Foobar"),
                new Claim(JwtClaimTypes.Scope, "haushaltsbuch")
            };

            var identity = new ClaimsIdentity(claims, "Test");
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, "Test");

            return AuthenticateResult.Success(ticket);
        }
    }
}