using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web_Api_Prueba.Models
{
    public class Meta
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal MontoActual { get; set; }
        public decimal MontoObjetivo { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaLimite { get; set; }
        public string Estado { get; set; }
        public int IdPersona { get; set; }

    }
}