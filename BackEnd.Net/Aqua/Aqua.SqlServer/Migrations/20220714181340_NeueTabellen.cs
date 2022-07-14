using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace com.marcelbenders.Aqua.SqlServer.Migrations
{
    public partial class NeueTabellen : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Korallen",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Wissenschaftlich = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Herkunft = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Salinitaet = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nitrat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phosphat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Calcium = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Magnesium = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Temperatur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Stroemung = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Schwierigkeitsgrad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Datum = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AquariumId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korallen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Korallen_Aquarien_AquariumId",
                        column: x => x.AquariumId,
                        principalTable: "Aquarien",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Korallen_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Pflanzen",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Wissenschaftlich = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Herkunft = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ph = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Kh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Temperatur = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bereich = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Wachstum = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Emers = table.Column<bool>(type: "bit", nullable: false),
                    Schwierigkeitsgrad = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Datum = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AquariumId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pflanzen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pflanzen_Aquarien_AquariumId",
                        column: x => x.AquariumId,
                        principalTable: "Aquarien",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pflanzen_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Korallen_AquariumId",
                table: "Korallen",
                column: "AquariumId");

            migrationBuilder.CreateIndex(
                name: "IX_Korallen_UserId",
                table: "Korallen",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Pflanzen_AquariumId",
                table: "Pflanzen",
                column: "AquariumId");

            migrationBuilder.CreateIndex(
                name: "IX_Pflanzen_UserId",
                table: "Pflanzen",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Korallen");

            migrationBuilder.DropTable(
                name: "Pflanzen");
        }
    }
}
