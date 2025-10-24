using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Web_Api_Prueba.Models
{
    public class Gasto
    {
        [Key]
        public int IdGasto { get; set; }
        public float Monto { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }

        // Clave foránea (agregación, no composición)
        public string? IdUsuario { get; set; }
       
        public Persona? Usuario { get; set; }

        // Relación con categoría
        public int? IdCategoriaGasto { get; set; }
        public CategoriaGasto? Categoria { get; set; }
    }
}
