using com.marcelbenders.Aqua.Domain.Sql;
using com.marcelbenders.Aqua.MongoDb;
using com.marcelbenders.Aqua.MongoDb.Repository;
using com.marcelbenders.Aqua.SqlServer;
using Microsoft.EntityFrameworkCore;

namespace Aqua.Copy;

public class Program
{
    public static async Task Main()
    {
        const string userId = "83c90062-9a55-4085-9ba8-51f36cdc711b";
        const string sqlUserId = "a2a625b3-9c0f-4a40-af5b-72fd1f58e073";
        var mongoCtx = new MongoContext();

        var repo = new MongoRepository<com.marcelbenders.Aqua.Domain.Aquarium>(mongoCtx);
        var notizRepo = new MongoRepository<com.marcelbenders.Aqua.Domain.Notiz>(mongoCtx);
        var fischRepo = new MongoRepository<com.marcelbenders.Aqua.Domain.Fisch>(mongoCtx);
        var duengungRepo = new MongoRepository<com.marcelbenders.Aqua.Domain.Duengung>(mongoCtx);
        var messungRepo = new MongoRepository<com.marcelbenders.Aqua.Domain.Messung>(mongoCtx);

        var opts = new DbContextOptionsBuilder();
        opts.UseSqlServer("Data Source=localhost,1433;Initial Catalog=Aqua;User Id=sa;Password=MyPass@word");

        var ctx = new DataContext(opts.Options);

        var aq = await repo.GetAllAsync(userId);
        var not = await notizRepo.GetAllAsync(userId);
        var mess = await messungRepo.GetAllAsync(userId);
        var fi = await fischRepo.GetAllAsync(userId);
        var due = await duengungRepo.GetAllAsync(userId);

        var aquarien = new List<Aquarium>();
        var notizen = new List<Notiz>();
        var messungen = new List<Messung>();
        var duengungen = new List<Duengung>();
        var fische = new List<Fisch>();

        foreach (var aquarium in aq)
        {
            aquarien.Add(new Aquarium
            {
                Id = Guid.NewGuid(),
                UserId = sqlUserId,
                Datum = aquarium.Datum,
                Liter = aquarium.Liter,
                Name = aquarium.Name
            });
        }

        foreach (var notiz in not)
        {
            notiz.Aquarium.Name = notiz.Aquarium.Name == "Wohnzimmer" ? "Proxima" : notiz.Aquarium.Name;
            notizen.Add(new Notiz
            {
                Id = Guid.NewGuid(),
                UserId = sqlUserId,
                AquariumId = aquarien.First(s => s.Name == notiz.Aquarium.Name).Id,
                Datum = notiz.Datum,
                Tag = notiz.Tag,
                Text = notiz.Text
            });
        }

        foreach (var messung in mess)
        {
            messung.Aquarium.Name = messung.Aquarium.Name == "Wohnzimmer" ? "Proxima" : messung.Aquarium.Name;
            messungen.Add(new Messung
            {
                Id = Guid.NewGuid(),
                UserId = sqlUserId,
                AquariumId = aquarien.First(s => s.Name == messung.Aquarium.Name).Id,
                Datum = messung.Datum,
                Menge = messung.Menge,
                Wert = messung.Wert
            });
        }

        foreach (var duengung in due)
        {
            duengung.Aquarium.Name = duengung.Aquarium.Name == "Wohnzimmer" ? "Proxima" : duengung.Aquarium.Name;
            duengungen.Add(new Duengung
            {
                Id = Guid.NewGuid(),
                UserId = sqlUserId,
                AquariumId = aquarien.First(s => s.Name == duengung.Aquarium.Name).Id,
                Datum = duengung.Datum,
                Duenger = duengung.Duenger,
                Menge = duengung.Menge
            });
        }

        foreach (var fisch in fi)
        {
            fisch.Aquarium.Name = fisch.Aquarium.Name == "Wohnzimmer" ? "Proxima" : fisch.Aquarium.Name;
            fische.Add(new Fisch
            {
                Id = Guid.NewGuid(),
                UserId = sqlUserId,
                AquariumId = aquarien.First(s => s.Name == fisch.Aquarium.Name).Id,
                Datum = fisch.Datum,
                Anzahl = fisch.Anzahl,
                Geschlecht = fisch.Geschlecht,
                Herkunft = fisch.Herkunft,
                Wissenschaftlich = fisch.Wissenschaftlich,
                Schwimmzone = fisch.Schwimmzone,
                Name = fisch.Name,
                Gh = new Bereich {Bis = fisch.Gh.Bis, Von = fisch.Gh.Von, Einheit = fisch.Gh.Einheit},
                Kh = new Bereich {Bis = fisch.Kh.Bis, Von = fisch.Kh.Von, Einheit = fisch.Kh.Einheit},
                Temperatur = new Bereich
                    {Von = fisch.Temperatur.Von, Bis = fisch.Temperatur.Bis, Einheit = fisch.Temperatur.Einheit},
                Ph = new Bereich {Von = fisch.Ph.Von, Bis = fisch.Ph.Bis, Einheit = fisch.Ph.Einheit}
            });
        }

        ctx.Aquarien.AddRange(aquarien);
        ctx.SaveChanges();
        ctx.Notizen.AddRange(notizen);
        ctx.SaveChanges();
        ctx.Duengungen.AddRange(duengungen);
        ctx.SaveChanges();
        ctx.Messungen.AddRange(messungen);
        ctx.SaveChanges();
        ctx.Fische.AddRange(fische);
        ctx.SaveChanges();
    }
}