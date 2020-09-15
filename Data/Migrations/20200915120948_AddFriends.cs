using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class AddFriends : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MaxPlayers",
                table: "Groups",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinPlayers",
                table: "Groups",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Friend",
                columns: table => new
                {
                    RequesterId = table.Column<string>(nullable: false),
                    ReceiverId = table.Column<string>(nullable: false),
                    IsAccepted = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friend", x => new { x.ReceiverId, x.RequesterId });
                    table.ForeignKey(
                        name: "FK_Friend_AspNetUsers_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Friend_AspNetUsers_RequesterId",
                        column: x => x.RequesterId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friend_RequesterId",
                table: "Friend",
                column: "RequesterId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friend");

            migrationBuilder.DropColumn(
                name: "MaxPlayers",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "MinPlayers",
                table: "Groups");
        }
    }
}
