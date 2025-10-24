using System.ComponentModel.DataAnnotations;

namespace Web_Api_Prueba.Models
{
    public class Persona
    {

        [Key]
        public int IdPersona { get; set; }
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string Contrasena { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string TipoUsuario { get; set; }
        public bool Autenticado { get; set; }

        // Relación: un usuario puede tener varios gastos
        public ICollection<Gasto> Gastos { get; set; } = new List<Gasto>();

    }
}
