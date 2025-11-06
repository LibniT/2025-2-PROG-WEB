"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"

export default function Gastos() {
  const [gastos, setGastos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)
  const [nuevaCategoria, setNuevaCategoria] = useState({ nombre: "" })
  const [nuevoGasto, setNuevoGasto] = useState({
    descripcion: "",
    monto: "",
    idCategoriaGasto: null,
  })
  const [modoCrearCategoria, setModoCrearCategoria] = useState(false)
  const [notificacion, setNotificacion] = useState(null)

  const { usuario } = useAuth()

  const mostrarNotificacion = (mensaje, tipo = "success") => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

  // 📌 Cargar gastos y categorías al iniciar
  useEffect(() => {
    if (usuario) {
      cargarGastos()
      cargarCategorias()
    }
  }, [usuario])

  const cargarGastos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/Gasto`)
      const data = await res.json()

      const gastosDelUsuario = data.filter((g) => g.idPersona === usuario.id)
      setGastos(gastosDelUsuario)
    } catch (error) {
      console.error("Error al cargar gastos:", error)
      mostrarNotificacion("Error al cargar gastos", "error")
    }
  }

  const cargarCategorias = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/CategoriaGasto`)
      const data = await res.json()
      setCategorias(data)
    } catch (error) {
      console.error("Error al cargar categorías:", error)
      mostrarNotificacion("Error al cargar categorías", "error")
    }
  }

  // 📌 Guardar gasto
  const crearGasto = async (e) => {
    e.preventDefault()

    console.log("[v0] Creando gasto con datos:", nuevoGasto)

    try {
      if (!usuario || !usuario.id) {
        mostrarNotificacion("Error: No hay usuario logueado", "error")
        return
      }

      const ahora = new Date()
      const fechaLocal = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000).toISOString().slice(0, -1) // Remover la 'Z' para que C# la interprete como hora local

      const gasto = {
        Descripcion: nuevoGasto.descripcion,
        Monto: Number.parseFloat(nuevoGasto.monto),
        Fecha: fechaLocal,
        IdPersona: usuario.id,
        IdCategoriaGasto: nuevoGasto.idCategoriaGasto || null,
      }

      console.log("[v0] Enviando gasto a la API:", gasto)

      const response = await fetch(`${import.meta.env.VITE_API_URI}/Gasto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gasto),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("[v0] Error del servidor:", errorText)
        throw new Error(`Error al crear gasto: ${response.status}`)
      }

      const gastoCreado = await response.json()
      console.log("[v0] Gasto creado correctamente:", gastoCreado)

      mostrarNotificacion("Gasto creado exitosamente")
      setMostrarModal(false)
      setNuevoGasto({ descripcion: "", monto: "", idCategoriaGasto: null })
      cargarGastos()
    } catch (error) {
      console.error("[v0] Error creando gasto:", error)
      mostrarNotificacion("Error al crear el gasto", "error")
    }
  }

  // 📌 Crear nueva categoría
  const crearCategoria = async (e) => {
    e.preventDefault()

    console.log("[v0] Creando categoría:", nuevaCategoria)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/CategoriaGasto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Nombre: nuevaCategoria.nombre }),
      })

      if (res.ok) {
        const categoriaCreada = await res.json()
        console.log("[v0] Categoría creada:", categoriaCreada)
        mostrarNotificacion("Categoría creada exitosamente")

        setCategorias([...categorias, categoriaCreada])
        setNuevoGasto({ ...nuevoGasto, idCategoriaGasto: categoriaCreada.id })
        setModoCrearCategoria(false)
        setNuevaCategoria({ nombre: "" })
      } else {
        const errorText = await res.text()
        console.error("[v0] Error al crear categoría:", errorText)
        mostrarNotificacion("Error al crear la categoría", "error")
      }
    } catch (error) {
      console.error("[v0] Error al crear categoría:", error)
      mostrarNotificacion("Error de conexión al crear categoría", "error")
    }
  }

  // 📌 Eliminar gasto
  const eliminarGasto = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este gasto?")) return

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/Gasto/${id}`, { method: "DELETE" })
      if (res.ok) {
        mostrarNotificacion("Gasto eliminado correctamente")
        cargarGastos()
      } else {
        mostrarNotificacion("Error al eliminar gasto", "error")
      }
    } catch (error) {
      console.error("Error al eliminar gasto:", error)
      mostrarNotificacion("Error al eliminar gasto", "error")
    }
  }

  if (!usuario) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card">
          <div className="text-center space-y-4">
            <p className="text-slate-600 text-lg">Debes iniciar sesión para ver tus gastos</p>
            <Link to="/auth" className="btn inline-block">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {notificacion && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
            notificacion.tipo === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {notificacion.mensaje}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Gastos</h1>
        <button onClick={() => setMostrarModal(true)} className="btn">
          + Añadir Gasto
        </button>
      </div>

      {/* 📋 Lista de gastos */}
      <div className="space-y-4">
        {gastos.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <p className="text-lg">No hay gastos registrados</p>
            <p className="text-sm">Comienza agregando tu primer gasto</p>
          </div>
        ) : (
          gastos.map((gasto) => (
            <div key={gasto.id} className="p-4 bg-white rounded-xl shadow flex justify-between">
              <div>
                <p className="font-semibold">{gasto.descripcion}</p>
                <p className="text-sm text-gray-600">
                  {categorias.find((c) => c.id === gasto.idCategoriaGasto)?.nombre || "Sin categoría"} — ${gasto.monto}
                </p>
              </div>
              <button onClick={() => eliminarGasto(gasto.id)} className="text-red-500 hover:underline">
                Eliminar
              </button>
            </div>
          ))
        )}
      </div>

      {/* 🪟 Modal para añadir gasto */}
      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Añadir Gasto</h2>

            {!modoCrearCategoria ? (
              <form onSubmit={crearGasto} className="space-y-4">
                <div>
                  <label className="label">Descripción</label>
                  <input
                    className="input"
                    value={nuevoGasto.descripcion}
                    onChange={(e) => setNuevoGasto({ ...nuevoGasto, descripcion: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="label">Monto</label>
                  <input
                    className="input"
                    type="number"
                    step="0.01"
                    value={nuevoGasto.monto}
                    onChange={(e) => setNuevoGasto({ ...nuevoGasto, monto: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="label">Categoría</label>
                  <select
                    className="input"
                    value={nuevoGasto.idCategoriaGasto || ""}
                    onChange={(e) => {
                      const idSeleccionado = e.target.value ? Number.parseInt(e.target.value) : null
                      console.log("[v0] Categoría seleccionada:", idSeleccionado)
                      setNuevoGasto({ ...nuevoGasto, idCategoriaGasto: idSeleccionado })
                    }}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setModoCrearCategoria(true)}
                    className="text-blue-600 mt-1 hover:underline text-sm"
                  >
                    + Crear nueva categoría
                  </button>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarModal(false)
                      setNuevoGasto({ descripcion: "", monto: "", idCategoriaGasto: null })
                    }}
                    className="btn bg-gray-300 text-black"
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn">
                    Guardar
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={crearCategoria} className="space-y-4">
                <h3 className="text-lg font-semibold">Nueva Categoría</h3>
                <input
                  className="input"
                  placeholder="Nombre de la categoría"
                  value={nuevaCategoria.nombre}
                  onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, nombre: e.target.value })}
                  required
                />

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModoCrearCategoria(false)}
                    className="btn bg-gray-300 text-black"
                  >
                    Volver
                  </button>
                  <button type="submit" className="btn">
                    Crear
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
