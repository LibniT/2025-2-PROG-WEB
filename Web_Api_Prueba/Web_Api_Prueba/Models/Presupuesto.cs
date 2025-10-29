namespace Web_Api_Prueba.Models
{
    public class Presupuesto
    {

        public int Id { get; set; }
        public decimal MontoGlobal { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int IdPersona { get; set; }

    }
}