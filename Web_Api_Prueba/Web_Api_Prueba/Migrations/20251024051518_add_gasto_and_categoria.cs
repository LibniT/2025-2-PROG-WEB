using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_Api_Prueba.Migrations
{
    /// <inheritdoc />
    public partial class add_gasto_and_categoria : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Personas",
                newName: "TipoUsuario");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Personas",
                newName: "Correo");

            migrationBuilder.RenameColumn(
                name: "Apellido",
                table: "Personas",
                newName: "Contrasena");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Personas",
                newName: "IdPersona");

            migrationBuilder.AddColumn<bool>(
                name: "Autenticado",
                table: "Personas",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaRegistro",
                table: "Personas",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "CategoriaGastos",
                columns: table => new
                {
                    IdCategoriaGasto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ContadorGastos = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoriaGastos", x => x.IdCategoriaGasto);
                });

            migrationBuilder.CreateTable(
                name: "Gastos",
                columns: table => new
                {
                    IdGasto = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Monto = table.Column<float>(type: "real", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdUsuario = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UsuarioIdPersona = table.Column<int>(type: "int", nullable: true),
                    IdCategoriaGasto = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoriaIdCategoriaGasto = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gastos", x => x.IdGasto);
                    table.ForeignKey(
                        name: "FK_Gastos_CategoriaGastos_CategoriaIdCategoriaGasto",
                        column: x => x.CategoriaIdCategoriaGasto,
                        principalTable: "CategoriaGastos",
                        principalColumn: "IdCategoriaGasto");
                    table.ForeignKey(
                        name: "FK_Gastos_Personas_UsuarioIdPersona",
                        column: x => x.UsuarioIdPersona,
                        principalTable: "Personas",
                        principalColumn: "IdPersona");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Gastos_CategoriaIdCategoriaGasto",
                table: "Gastos",
                column: "CategoriaIdCategoriaGasto");

            migrationBuilder.CreateIndex(
                name: "IX_Gastos_UsuarioIdPersona",
                table: "Gastos",
                column: "UsuarioIdPersona");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Gastos");

            migrationBuilder.DropTable(
                name: "CategoriaGastos");

            migrationBuilder.DropColumn(
                name: "Autenticado",
                table: "Personas");

            migrationBuilder.DropColumn(
                name: "FechaRegistro",
                table: "Personas");

            migrationBuilder.RenameColumn(
                name: "TipoUsuario",
                table: "Personas",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "Correo",
                table: "Personas",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "Contrasena",
                table: "Personas",
                newName: "Apellido");

            migrationBuilder.RenameColumn(
                name: "IdPersona",
                table: "Personas",
                newName: "Id");
        }
    }
}
