using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Buchungen.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }


                var buchungen = new List<Buchung>
                {
                    new Buchung
                    {
                        Id = Guid.NewGuid(),
                        Name = "Autoversicherung",
                        Zeitpunkt = DateTime.Now.AddMonths(-2),
                        Beschreibung = "Erste allgemeine Versicherung",
                        Created = DateTime.Now,
                        Betrag = 222.22M,
                        Kategorie = Kategorie.Ausgabe,
                        Intervall = Intervall.Jahr,
                        Updated = DateTime.Now
                    },
                       new Buchung
                    {
                        Id = Guid.NewGuid(),
                        Name = "Rentenversicherung",
                        Zeitpunkt = DateTime.Now.AddMonths(-1),
                        Beschreibung = "Erste allgemeine Verunsericherung",
                        Created = DateTime.Now,
                        Betrag = 22.22M,
                        Kategorie = Kategorie.Ausgabe,
                        Intervall = Intervall.Monat,
                        Updated = DateTime.Now
                    },
                };

                await context.Buchungen.AddRangeAsync(buchungen);
                await context.SaveChangesAsync();
            }
        }
    }
}