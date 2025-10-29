namespace Web_Api_Prueba.Models
{
    public class CategoriaPresupuesto
    {

        public int Id { get; set; }
        public decimal MontoAsignado { get; set; }
        public int IdPresupuesto { get; set; }
        public int IdCategoriaGasto { get; set; }

    }
}