using System.ComponentModel.DataAnnotations;

namespace Web_Api_Prueba.Models
{
    public class CategoriaGasto
    {
        [Key]
        public int IdCategoriaGasto { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nombre { get; set; }

        // Número de gastos asociados (puede calcularse dinámicamente)
        public int ContadorGastos { get; set; }

        // 🔹 Relación agregada: una categoría puede tener muchos gastos,
        // pero los gastos pueden existir aunque se elimine la categoría.
        public ICollection<Gasto>? Gastos { get; set; } = new List<Gasto>();

        // 🔹 Métodos lógicos del modelo (pueden implementarse en el servicio o en la entidad)
        public void ActualizarContador()
        {
            ContadorGastos = Gastos?.Count ?? 0;
        }

        public void ReducirContador()
        {
            if (ContadorGastos > 0)
                ContadorGastos--;
        }

        public float CalcularTotalGastos()
        {
            return Gastos?.Sum(g => g.Monto) ?? 0f;
        }

        public float ObtenerPorcentajeGasto(float gastoTotal)
        {
            if (gastoTotal == 0) return 0;
            return (CalcularTotalGastos() / gastoTotal) * 100;
        }
    }
}
