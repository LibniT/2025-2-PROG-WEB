"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"

export default function Report() {
  const [periodType, setPeriodType] = useState("mes")
  const [gastos, setGastos] = useState([])
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState([])
  const [stats, setStats] = useState({
    totalGastos: 0,
    totalIngresos: 0,
    balance: 0,
  })

  const { usuario } = useAuth()

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        if (!usuario) {
          console.log("[v0] No hay usuario logueado")
          setLoading(false)
          return
        }

        console.log("[v0] Usuario actual:", usuario)
        const response = await fetch(`${import.meta.env.VITE_API_URI}/Gasto`)
        const data = await response.json()
        console.log("[v0] Gastos recibidos de la API:", data)

        const gastosUsuario = data.filter((g) => g.idPersona === usuario.id)
        console.log("[v0] Gastos filtrados del usuario:", gastosUsuario)
        setGastos(gastosUsuario)
      } catch (error) {
        console.error("[v0] Error al cargar gastos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGastos()
  }, [usuario])

  useEffect(() => {
    if (gastos.length === 0) return

    const now = new Date()
    const filteredData = []
    let totalGastos = 0

    console.log("[v0] ===== INICIO DE FILTRADO =====")
    console.log("[v0] Período:", periodType)
    console.log("[v0] Fecha actual:", now.toISOString())
    console.log("[v0] Total de gastos del usuario:", gastos.length)

    const parseFecha = (fechaString) => {
      // Si la fecha no tiene 'Z' al final, agregarla para que se interprete como UTC
      // y luego convertir a hora local
      let fechaParseada
      if (fechaString.endsWith("Z")) {
        fechaParseada = new Date(fechaString)
      } else {
        // Si no tiene Z, asumimos que es hora local del servidor
        fechaParseada = new Date(fechaString + "Z")
      }

      console.log(
        "[v0] Parseando fecha:",
        fechaString,
        "→",
        fechaParseada.toISOString(),
        "→ Local:",
        fechaParseada.toLocaleString(),
      )
      return fechaParseada
    }

    if (periodType === "dia") {
      for (let i = 6; i >= 0; i--) {
        const diaObjetivo = new Date(now)
        diaObjetivo.setDate(now.getDate() - i)
        diaObjetivo.setHours(0, 0, 0, 0)

        const diaFin = new Date(diaObjetivo)
        diaFin.setHours(23, 59, 59, 999)

        console.log(`[v0] Buscando gastos para día ${i}:`, {
          inicio: diaObjetivo.toISOString(),
          fin: diaFin.toISOString(),
          inicioLocal: diaObjetivo.toLocaleString(),
          finLocal: diaFin.toLocaleString(),
        })

        const gastosDia = gastos.filter((g) => {
          const fechaGasto = parseFecha(g.fecha)
          const enRango = fechaGasto >= diaObjetivo && fechaGasto <= diaFin

          if (enRango) {
            console.log("[v0] ✓ Gasto encontrado:", {
              descripcion: g.descripcion,
              fecha: g.fecha,
              fechaLocal: fechaGasto.toLocaleString(),
              monto: g.monto,
            })
          }

          return enRango
        })

        const total = gastosDia.reduce((sum, g) => sum + g.monto, 0)
        totalGastos += total

        const nombreDia =
          i === 0 ? "Hoy" : i === 1 ? "Ayer" : diaObjetivo.toLocaleDateString("es-ES", { weekday: "short" })

        console.log(`[v0] Resultado día ${nombreDia}:`, {
          fecha: diaObjetivo.toLocaleDateString(),
          gastosEncontrados: gastosDia.length,
          total: total,
        })

        filteredData.push({
          name: nombreDia,
          gastos: total,
        })
      }
    } else if (periodType === "mes") {
      for (let i = 3; i >= 0; i--) {
        const semanaFin = new Date(now)
        semanaFin.setDate(now.getDate() - i * 7)
        semanaFin.setHours(23, 59, 59, 999)

        const semanaInicio = new Date(semanaFin)
        semanaInicio.setDate(semanaFin.getDate() - 6)
        semanaInicio.setHours(0, 0, 0, 0)

        console.log(`[v0] Buscando gastos para semana ${4 - i}:`, {
          inicio: semanaInicio.toISOString(),
          fin: semanaFin.toISOString(),
          inicioLocal: semanaInicio.toLocaleString(),
          finLocal: semanaFin.toLocaleString(),
        })

        const gastosSemana = gastos.filter((g) => {
          const fechaGasto = parseFecha(g.fecha)
          const enRango = fechaGasto >= semanaInicio && fechaGasto <= semanaFin

          if (enRango) {
            console.log("[v0] ✓ Gasto encontrado:", {
              descripcion: g.descripcion,
              fecha: g.fecha,
              fechaLocal: fechaGasto.toLocaleString(),
              monto: g.monto,
            })
          }

          return enRango
        })

        const total = gastosSemana.reduce((sum, g) => sum + g.monto, 0)
        totalGastos += total

        console.log(`[v0] Resultado semana ${4 - i}:`, {
          inicio: semanaInicio.toLocaleDateString(),
          fin: semanaFin.toLocaleDateString(),
          gastosEncontrados: gastosSemana.length,
          total: total,
        })

        filteredData.push({
          name: `Sem ${4 - i}`,
          gastos: total,
        })
      }
    } else if (periodType === "año") {
      const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

      for (let i = 11; i >= 0; i--) {
        const mesObjetivo = new Date(now.getFullYear(), now.getMonth() - i, 1)
        const mesInicio = new Date(mesObjetivo.getFullYear(), mesObjetivo.getMonth(), 1)
        const mesFin = new Date(mesObjetivo.getFullYear(), mesObjetivo.getMonth() + 1, 0, 23, 59, 59, 999)

        const gastosMes = gastos.filter((g) => {
          const fechaGasto = parseFecha(g.fecha)
          return fechaGasto >= mesInicio && fechaGasto <= mesFin
        })

        const total = gastosMes.reduce((sum, g) => sum + g.monto, 0)
        totalGastos += total

        filteredData.push({
          name: meses[mesObjetivo.getMonth()],
          gastos: total,
        })
      }
    }

    console.log("[v0] ===== RESULTADO FINAL =====")
    console.log("[v0] Datos del gráfico:", filteredData)
    console.log("[v0] Total de gastos:", totalGastos)

    setChartData(filteredData)
    setStats({
      totalGastos: totalGastos,
      totalIngresos: 0,
      balance: -totalGastos,
    })
  }, [gastos, periodType])

  if (!usuario) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card">
          <p className="text-center text-slate-600">Debes iniciar sesión para ver tus reportes</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando reportes...</p>
        </div>
      </div>
    )
  }

  const maxValue = Math.max(...chartData.map((d) => d.gastos), 1)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Reportes</h1>
          <p className="text-slate-600 mt-1">Análisis de tus gastos e ingresos</p>
        </div>
      </div>

      <div className="card">
        <label className="label mb-3">Período de Análisis</label>
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setPeriodType("dia")}
            className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all ${
              periodType === "dia" ? "bg-white text-primary shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Día
          </button>
          <button
            onClick={() => setPeriodType("mes")}
            className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all ${
              periodType === "mes" ? "bg-white text-primary shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => setPeriodType("año")}
            className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all ${
              periodType === "año" ? "bg-white text-primary shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Año
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-red-50 to-white border-red-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Total Gastos</span>
            <span className="text-2xl">💸</span>
          </div>
          <p className="text-3xl font-bold text-red-600">${stats.totalGastos.toFixed(2)}</p>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-white border-green-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Total Ingresos</span>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-bold text-green-600">${stats.totalIngresos.toFixed(2)}</p>
        </div>

        <div className="card bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Balance</span>
            <span className="text-2xl">📊</span>
          </div>
          <p className={`text-3xl font-bold ${stats.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${Math.abs(stats.balance).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-bold text-slate-900 mb-6">
          Tendencia de Gastos -{" "}
          {periodType === "dia" ? "Últimos 7 días" : periodType === "mes" ? "Últimas 4 semanas" : "Últimos 12 meses"}
        </h3>

        {chartData.length > 0 ? (
          <div className="space-y-4">
            {chartData.map((item, index) => {
              const percentage = maxValue > 0 ? (item.gastos / maxValue) * 100 : 0
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">{item.name}</span>
                    <span className="font-semibold text-red-600">${item.gastos.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-8 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-400 h-full rounded-full transition-all duration-500 flex items-center justify-end px-3"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 15 && (
                        <span className="text-white text-xs font-semibold">{percentage.toFixed(0)}%</span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <span className="text-6xl mb-4">📊</span>
            <p className="text-lg font-semibold text-slate-900 mb-2">No hay datos para mostrar</p>
            <p className="text-slate-600">Agrega gastos para ver tus estadísticas</p>
          </div>
        )}
      </div>
    </div>
  )
}
