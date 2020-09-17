using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Data.Migrations
{
    public partial class AddGroupFinder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GroupFinderId",
                table: "AspNetUsers",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "GroupFinder",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(nullable: true),
                    QueueType = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupFinder", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_GroupFinderId",
                table: "AspNetUsers",
                column: "GroupFinderId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_GroupFinder_GroupFinderId",
                table: "AspNetUsers",
                column: "GroupFinderId",
                principalTable: "GroupFinder",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_GroupFinder_GroupFinderId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "GroupFinder");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_GroupFinderId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "GroupFinderId",
                table: "AspNetUsers");
        }
    }
}
