using System.Security.Claims;

namespace com.marcelbenders.Aqua.Api.Extensions;

public static class HttpContextExtensions
{
    public static string GetUserIdentifier(this HttpContext context)
    {
        var sid = context.User?.Identities.FirstOrDefault()?.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier);
        return sid?.Value ?? null;
    } 
}