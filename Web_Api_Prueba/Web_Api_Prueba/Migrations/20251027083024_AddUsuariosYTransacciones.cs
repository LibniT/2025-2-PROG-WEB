using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_Api_Prueba.Migrations
{
    /// <inheritdoc />
    public partial class AddUsuariosYTransacciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Completada",
                table: "Metas");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FechaLimite",
                table: "Metas",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Descripcion",
                table: "Metas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Estado",
                table: "Metas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "IdPersona",
                table: "Metas",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Descripcion",
                table: "Metas");

            migrationBuilder.DropColumn(
                name: "Estado",
                table: "Metas");

            migrationBuilder.DropColumn(
                name: "IdPersona",
                table: "Metas");

            migrationBuilder.AlterColumn<DateTime>(
                name: "FechaLimite",
                table: "Metas",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddColumn<bool>(
                name: "Completada",
                table: "Metas",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
