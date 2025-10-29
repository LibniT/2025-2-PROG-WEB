"use client"

import { useEffect, useState } from "react"

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

  const mostrarNotificacion = (mensaje, tipo = "success") => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  // Cargar gastos después de tener las categorías para mapearlas correctamente
  useEffect(() => {
    if (categorias.length > 0) {
      cargarGastos()
    }
  }, [categorias])

  const cargarGastos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/Gasto`)
      const data = await res.json()

      // Mapear manualmente las categorías usando el id correcto del backend
      const gastosConCategoria = data.map((g) => ({
        ...g,
        categoria: g.idCategoriaGasto ? categorias.find((c) => c.id === g.idCategoriaGasto) : null,
      }))
      setGastos(gastosConCategoria)
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

  const crearGasto = async (e) => {
    e.preventDefault()

    try {
      if (!nuevoGasto.descripcion || !nuevoGasto.monto) {
        mostrarNotificacion("Completa descripción y monto", "error")
        return
      }

      const ahora = new Date()
      const fechaLocal = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000).toISOString()

      const gastoPayload = {
        descripcion: nuevoGasto.descripcion,
        monto: Number.parseFloat(nuevoGasto.monto),
        fecha: fechaLocal,
        idUsuario: "U001",
        ...(nuevoGasto.idCategoriaGasto && { idCategoriaGasto: nuevoGasto.idCategoriaGasto }),
      }

      const response = await fetch(`${import.meta.env.VITE_API_URI}/Gasto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gastoPayload),
      })

      if (!response.ok) throw new Error(`Error al crear gasto: ${response.status}`)

      mostrarNotificacion("Gasto creado correctamente")
      await cargarGastos()
      setMostrarModal(false)
      setNuevoGasto({ descripcion: "", monto: "", idCategoriaGasto: null })
    } catch (error) {
      console.error("Error creando gasto:", error)
      mostrarNotificacion("Error creando gasto", "error")
    }
  }

  const crearCategoria = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/CategoriaGasto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCategoria),
      })

      if (res.ok) {
        const categoriaCreada = await res.json()
        mostrarNotificacion("Categoría creada exitosamente")

        // Actualizar lista de categorías y seleccionar la nueva usando el id correcto
        setCategorias((prev) => [...prev, categoriaCreada])
        setNuevoGasto((prev) => ({
          ...prev,
          idCategoriaGasto: categoriaCreada.id,
        }))
        setModoCrearCategoria(false)
        setNuevaCategoria({ nombre: "" })
      } else {
        mostrarNotificacion("Error al crear la categoría", "error")
      }
    } catch (error) {
      console.error("Error al crear categoría:", error)
      mostrarNotificacion("Error al crear categoría", "error")
    }
  }

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

      <div className="space-y-4">
        {/* Usar id en lugar de idGasto para coincidir con el backend */}
        {gastos.map((gasto) => (
          <div key={gasto.id} className="p-4 bg-white rounded-xl shadow flex justify-between">
            <div>
              <p className="font-semibold">{gasto.descripcion}</p>
              <p className="text-sm text-gray-600">
                {gasto.categoria?.nombre || "Sin categoría"} — ${gasto.monto}
              </p>
            </div>
            <button onClick={() => eliminarGasto(gasto.id)} className="text-red-500 hover:underline">
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {mostrarModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
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
                  <label className="label">Categoría (opcional)</label>
                  {/* Usar id en lugar de idCategoriaGasto y manejar correctamente el valor null */}
                  <select
                    className="input"
                    value={nuevoGasto.idCategoriaGasto || ""}
                    onChange={(e) => {
                      const valor = e.target.value
                      setNuevoGasto({
                        ...nuevoGasto,
                        idCategoriaGasto: valor ? Number.parseInt(valor, 10) : null,
                      })
                    }}
                  >
                    <option value="">Sin categoría</option>
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
                      setModoCrearCategoria(false)
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
                    onClick={() => {
                      setModoCrearCategoria(false)
                      setNuevaCategoria({ nombre: "" })
                    }}
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
