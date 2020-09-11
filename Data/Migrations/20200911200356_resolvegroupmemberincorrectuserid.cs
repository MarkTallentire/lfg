using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class resolvegroupmemberincorrectuserid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupMember_AspNetUsers_UserId1",
                table: "GroupMember");

            migrationBuilder.DropIndex(
                name: "IX_GroupMember_UserId1",
                table: "GroupMember");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "GroupMember");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "GroupMember",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.CreateIndex(
                name: "IX_GroupMember_UserId",
                table: "GroupMember",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMember_AspNetUsers_UserId",
                table: "GroupMember",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GroupMember_AspNetUsers_UserId",
                table: "GroupMember");

            migrationBuilder.DropIndex(
                name: "IX_GroupMember_UserId",
                table: "GroupMember");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "GroupMember",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "GroupMember",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_GroupMember_UserId1",
                table: "GroupMember",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_GroupMember_AspNetUsers_UserId1",
                table: "GroupMember",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
