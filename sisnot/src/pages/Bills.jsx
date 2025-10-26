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
    idCategoriaGasto: "", // <-- ahora mantenemos el id aquí
    categoria: null,
  })
  const [modoCrearCategoria, setModoCrearCategoria] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)

  const mostrarNotificacion = (mensaje, tipo = "success") => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

  useEffect(() => {
    cargarGastos()
    cargarCategorias()
  }, [])

  const cargarGastos = async () => {
    try {
      const res = await fetch("https://localhost:7169/api/Gastoes")
      const data = await res.json()
      // si backend no trae objeto categoria, lo resolvemos localmente
      const gastosConCategoria = data.map(g => ({
        ...g,
        categoria: g.categoria ?? categorias.find(c => c.idCategoriaGasto === g.idCategoriaGasto) ?? null
      }))
      setGastos(gastosConCategoria)
    } catch (error) {
      console.error("Error al cargar gastos:", error)
    }
  }

  const cargarCategorias = async () => {
    try {
      const res = await fetch("https://localhost:7169/api/CategoriaGastoes")
      const data = await res.json()
      setCategorias(data)
    } catch (error) {
      console.error("Error al cargar categorías:", error)
    }
  }

  // Guardar gasto (ahora previene el submit y usa idCategoriaGasto)
  const crearGasto = async (e) => {
    e.preventDefault()

    try {
      // validaciones básicas
      if (!nuevoGasto.descripcion || !nuevoGasto.monto) {
        mostrarNotificacion("Completa descripción y monto", "error")
        return
      }

      const gastoPayload = {
        descripcion: nuevoGasto.descripcion,
        monto: parseFloat(nuevoGasto.monto),
        fecha: new Date().toISOString(),
        idUsuario: "U001", // ajusta según tu auth
        idCategoriaGasto: nuevoGasto.idCategoriaGasto ? parseInt(nuevoGasto.idCategoriaGasto, 10) : null,
      }

      const response = await fetch("https://localhost:7169/api/Gastoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gastoPayload),
      })

      if (!response.ok) throw new Error(`Error al crear gasto: ${response.status}`)

      // opcional: el backend devuelve el gasto creado
      const gastoCreado = await response.json().catch(() => null)

      mostrarNotificacion("Gasto creado correctamente")
      // refrescamos la lista desde el servidor
      await cargarGastos()
      setMostrarModal(false)

      // reset del formulario local
      setNuevoGasto({ descripcion: "", monto: "", idCategoriaGasto: "", categoria: null })
      setCategoriaSeleccionada(null)
    } catch (error) {
      console.error("Error creando gasto:", error)
      mostrarNotificacion("Error creando gasto", "error")
    }
  }

  // Crear nueva categoría (igual que antes)
  const crearCategoria = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("https://localhost:7169/api/CategoriaGastoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCategoria),
      })

      if (res.ok) {
        const categoriaCreada = await res.json()
        mostrarNotificacion("Categoría creada exitosamente")
        setCategorias(prev => [...prev, categoriaCreada])
        // automáticamente seleccionar la categoría creada para el nuevo gasto
        setNuevoGasto(prev => ({ ...prev, idCategoriaGasto: categoriaCreada.idCategoriaGasto, categoria: categoriaCreada }))
        setModoCrearCategoria(false)
        setNuevaCategoria({ nombre: "" })
      } else {
        mostrarNotificacion("Error al crear la categoría", "error")
      }
    } catch (error) {
      console.error("Error al crear categoría:", error)
    }
  }

  const eliminarGasto = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este gasto?")) return

    try {
      const res = await fetch(`https://localhost:7169/api/Gastoes/${id}`, { method: "DELETE" })
      if (res.ok) {
        mostrarNotificacion("Gasto eliminado correctamente")
        cargarGastos()
      } else {
        mostrarNotificacion("Error al eliminar gasto", "error")
      }
    } catch (error) {
      console.error("Error al eliminar gasto:", error)
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
        {gastos.map((gasto) => (
          <div key={gasto.idGasto} className="p-4 bg-white rounded-xl shadow flex justify-between">
            <div>
              <p className="font-semibold">{gasto.descripcion}</p>
              <p className="text-sm text-gray-600">
                {gasto.categoria?.nombre || "Sin categoría"} — ${gasto.monto}
              </p>
            </div>
            <button onClick={() => eliminarGasto(gasto.idGasto)} className="text-red-500 hover:underline">
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
                      const valor = e.target.value
                      if (!valor) {
                        setCategoriaSeleccionada(null)
                        setNuevoGasto({ ...nuevoGasto, idCategoriaGasto: "", categoria: null })
                        return
                      }
                      const idSeleccionado = parseInt(valor, 10)
                      const seleccionada = categorias.find(c => c.idCategoriaGasto === idSeleccionado) || null
                      setCategoriaSeleccionada(seleccionada)
                      setNuevoGasto({ ...nuevoGasto, idCategoriaGasto: idSeleccionado, categoria: seleccionada })
                    }}
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.idCategoriaGasto} value={categoria.idCategoriaGasto}>
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
                  <button type="button" onClick={() => { setMostrarModal(false); setModoCrearCategoria(false) }} className="btn bg-gray-300 text-black">
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
