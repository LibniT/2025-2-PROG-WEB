using System.ComponentModel.DataAnnotations;

namespace Web_Api_Prueba.Models
{
    public class CategoriaGasto
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int idPersona { get; set; }

    }
}