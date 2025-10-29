namespace Web_Api_Prueba.Models
{
    public class Gasto
    {

        public int Id { get; set; }
        public decimal Monto { get; set; }
        public DateTime Fecha { get; set; }
        public string Descripcion { get; set; }
        public int IdPersona { get; set; }
        public int IdCategoriaGasto { get; set; }

    }
}