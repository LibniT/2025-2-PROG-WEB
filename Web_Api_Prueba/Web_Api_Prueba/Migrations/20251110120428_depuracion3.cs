using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_Api_Prueba.Migrations
{
    /// <inheritdoc />
    public partial class depuracion3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "idPersona",
                table: "CategoriaGastos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idPersona",
                table: "CategoriaGastos");
        }
    }
}
