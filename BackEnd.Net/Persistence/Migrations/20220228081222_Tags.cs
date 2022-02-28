using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class Tags : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Created = table.Column<DateTimeOffset>(type: "TEXT", nullable: false),
                    Updated = table.Column<DateTimeOffset>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BuchungTag",
                columns: table => new
                {
                    BuchungenId = table.Column<Guid>(type: "TEXT", nullable: false),
                    TagsId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BuchungTag", x => new { x.BuchungenId, x.TagsId });
                    table.ForeignKey(
                        name: "FK_BuchungTag_Buchungen_BuchungenId",
                        column: x => x.BuchungenId,
                        principalTable: "Buchungen",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BuchungTag_Tags_TagsId",
                        column: x => x.TagsId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Created", "Name", "Updated" },
                values: new object[] { new Guid("59ca7d7f-cf79-4f54-83b8-4a7b44de1995"), new DateTimeOffset(new DateTime(2022, 2, 28, 9, 12, 22, 746, DateTimeKind.Unspecified).AddTicks(5186), new TimeSpan(0, 1, 0, 0, 0)), "Versicherung", null });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Created", "Name", "Updated" },
                values: new object[] { new Guid("5aa5d9f3-8cf4-4a77-b072-5db7e78c8db1"), new DateTimeOffset(new DateTime(2022, 2, 28, 9, 12, 22, 746, DateTimeKind.Unspecified).AddTicks(5184), new TimeSpan(0, 1, 0, 0, 0)), "Spende", null });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Created", "Name", "Updated" },
                values: new object[] { new Guid("686a7e4c-6fd1-4d8b-a152-956e01f20921"), new DateTimeOffset(new DateTime(2022, 2, 28, 9, 12, 22, 746, DateTimeKind.Unspecified).AddTicks(5128), new TimeSpan(0, 1, 0, 0, 0)), "App", null });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Created", "Name", "Updated" },
                values: new object[] { new Guid("6dfb2904-914b-47f2-8c63-d04f402e1842"), new DateTimeOffset(new DateTime(2022, 2, 28, 9, 12, 22, 746, DateTimeKind.Unspecified).AddTicks(5181), new TimeSpan(0, 1, 0, 0, 0)), "Wohnmobil", null });

            migrationBuilder.CreateIndex(
                name: "IX_BuchungTag_TagsId",
                table: "BuchungTag",
                column: "TagsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BuchungTag");

            migrationBuilder.DropTable(
                name: "Tags");
        }
    }
}
