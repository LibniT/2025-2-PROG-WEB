using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web_Api_Prueba.Models
{
    public class Meta
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal MontoActual { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal MontoObjetivo { get; set; }

        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public DateTime? FechaLimite { get; set; }

        public bool Completada { get; set; } = false;

    }
}