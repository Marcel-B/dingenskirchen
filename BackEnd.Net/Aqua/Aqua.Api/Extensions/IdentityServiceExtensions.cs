using System.Text;
using com.marcelbenders.Aqua.Api.Services;
using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.SqlServer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace com.marcelbenders.Aqua.Api.Extensions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(
        this IServiceCollection services,
        IConfiguration config)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        services.AddIdentityCore<AppUser>(options => { }).AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });
        services.AddScoped<TokenService>();

        return services;
    }
}