using Microsoft.EntityFrameworkCore;
using Web_Api_Prueba.Models;

namespace Web_Api_Prueba.Data
{
    public class ConexionContext : DbContext   
    {

        public ConexionContext(DbContextOptions<ConexionContext> options) : base(options)
        {



        }

        public DbSet<Persona> Personas { get; set; }
        public DbSet<Gasto> Gastos { get; set; }
        public DbSet<CategoriaGasto> CategoriaGastos { get; set; }



    }
}
