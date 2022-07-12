using com.marcelbenders.Aqua.Domain;
using com.marcelbenders.Aqua.Domain.Sql;
using Microsoft.AspNetCore.Identity;

namespace com.marcelbenders.Aqua.SqlServer;

public class SeedData
{
    public static async Task Seed(DataContext context, UserManager<AppUser> userManager)
    {
        if (!userManager.Users.Any())
        {
            var users = new List<AppUser>
            {
                new()
                {
                    DisplayName = "Marcel",
                    UserName = "marcel",
                    Email = "marcel.benders@foo.com"
                }
            };
            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "P@55w0rt!");
            }
        }
    }
}