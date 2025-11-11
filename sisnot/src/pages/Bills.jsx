"use client"

import { useEffect, useState } from "react"
<<<<<<< Updated upstream
=======
import { useAuth } from "../context/AuthContext"
>>>>>>> Stashed changes

export default function Gastos() {
  const { usuario } = useAuth()

  const [gastos, setGastos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [mostrarModal, setMostrarModal] = useState(false)
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre: "",
    idPersonaCategoria: null,
  })

  const [nuevoGasto, setNuevoGasto] = useState({
    descripcion: "",
    monto: "",
<<<<<<< Updated upstream
    idCategoriaGasto: "", // <-- ahora mantenemos el id aquí
    categoria: null,
  })
  const [modoCrearCategoria, setModoCrearCategoria] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
=======
    idCategoriaGasto: null,
    idPersonaGasto: null,
  })
  const [modoCrearCategoria, setModoCrearCategoria] = useState(false)
  const [notificacion, setNotificacion] = useState(null)
>>>>>>> Stashed changes

  const mostrarNotificacion = (mensaje, tipo = "success") => {
    setNotificacion({ mensaje, tipo })
    setTimeout(() => setNotificacion(null), 3000)
  }

<<<<<<< Updated upstream
  useEffect(() => {
    cargarGastos()
    cargarCategorias()
  }, [])
=======
  // Cuando usuario esté disponible, cargamos categorías y gastos
  useEffect(() => {
    if (!usuario || !usuario.id) return

    // actualizar idPersonaGasto por si se necesita al crear
    setNuevoGasto((prev) => ({ ...prev, idPersonaGasto: usuario.id }))

    // cargar datos del usuario
    cargarCategorias()
    cargarGastos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario])
>>>>>>> Stashed changes

  const cargarGastos = async () => {
    if (!usuario || !usuario.id) {
      console.warn("No hay usuario para cargar gastos")
      return
    }

    try {
<<<<<<< Updated upstream
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
=======
      console.log("Cargando gastos para usuario:", usuario.id)
      const res = await fetch(`${import.meta.env.VITE_API_URI}/Gasto/User/${usuario.id}`)
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const data = await res.json()

      // Guardamos los gastos tal cual vienen (contienen idCategoriaGasto)
      if (Array.isArray(data)) {
        setGastos(data)
      } else {
        setGastos([])
        console.warn("Respuesta de gastos no es array:", data)
      }
    } catch (error) {
      console.error("Error al cargar gastos:", error)
      mostrarNotificacion("Error al cargar gastos", "error")
      setGastos([])
>>>>>>> Stashed changes
    }
  }

  const cargarCategorias = async () => {
    if (!usuario || !usuario.id) {
      console.warn("No hay usuario para cargar categorias")
      return
    }

    try {
<<<<<<< Updated upstream
      const res = await fetch("https://localhost:7169/api/CategoriaGastoes")
=======
      const res = await fetch(`${import.meta.env.VITE_API_URI}/CategoriaGasto/User/${usuario.id}`)
      if (!res.ok) throw new Error(`Error ${res.status}`)
>>>>>>> Stashed changes
      const data = await res.json()
      // data expected to be array of categorias
      setCategorias(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error al cargar categorías:", error)
<<<<<<< Updated upstream
    }
  }

  // Guardar gasto (ahora previene el submit y usa idCategoriaGasto)
=======
      mostrarNotificacion("Error al cargar categorías", "error")
      setCategorias([])
    }
  }

>>>>>>> Stashed changes
  const crearGasto = async (e) => {
    e.preventDefault()

    try {
<<<<<<< Updated upstream
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
=======
      if (!nuevoGasto.descripcion || !nuevoGasto.monto) {
        mostrarNotificacion("Completa descripción y monto", "error")
        return
      }

      if (!usuario || !usuario.id) {
        mostrarNotificacion("No se encontró el usuario. Inicia sesión de nuevo.", "error")
        return
      }

      const ahora = new Date()
      const fechaLocal = new Date(ahora.getTime() - ahora.getTimezoneOffset() * 60000).toISOString()

      const gastoPayload = {
        descripcion: nuevoGasto.descripcion,
        monto: Number.parseFloat(nuevoGasto.monto),
        fecha: fechaLocal,
        // Ajusta según tu backend; aquí se usa idPersona (común en tu API)
        idPersona: usuario.id,
        ...(nuevoGasto.idCategoriaGasto != null && { idCategoriaGasto: nuevoGasto.idCategoriaGasto }),
      }

      const response = await fetch(`${import.meta.env.VITE_API_URI}/Gasto`, {
>>>>>>> Stashed changes
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gastoPayload),
      })

      if (!response.ok) throw new Error(`Error al crear gasto: ${response.status}`)

<<<<<<< Updated upstream
      // opcional: el backend devuelve el gasto creado
      const gastoCreado = await response.json().catch(() => null)

      mostrarNotificacion("Gasto creado correctamente")
      // refrescamos la lista desde el servidor
      await cargarGastos()
      setMostrarModal(false)

      // reset del formulario local
      setNuevoGasto({ descripcion: "", monto: "", idCategoriaGasto: "", categoria: null })
      setCategoriaSeleccionada(null)
=======
      mostrarNotificacion("Gasto creado correctamente")
      await cargarGastos()
      setMostrarModal(false)
      setNuevoGasto({ descripcion: "", monto: "", idCategoriaGasto: null, idPersonaGasto: usuario.id })
>>>>>>> Stashed changes
    } catch (error) {
      console.error("Error creando gasto:", error)
      mostrarNotificacion("Error creando gasto", "error")
    }
  }

<<<<<<< Updated upstream
  // Crear nueva categoría (igual que antes)
  const crearCategoria = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("https://localhost:7169/api/CategoriaGastoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaCategoria),
=======
  const crearCategoria = async (e) => {
    e.preventDefault()
    try {
      if (!usuario?.id) {
        mostrarNotificacion("No se encontró el usuario autenticado", "error")
        return
      }

      const categoriaAEnviar = {
        ...nuevaCategoria,
        idPersona: usuario.id,
      }

      const res = await fetch(`${import.meta.env.VITE_API_URI}/CategoriaGasto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoriaAEnviar),
>>>>>>> Stashed changes
      })

      if (res.ok) {
        const categoriaCreada = await res.json()
        mostrarNotificacion("Categoría creada exitosamente")
<<<<<<< Updated upstream
        setCategorias(prev => [...prev, categoriaCreada])
        // automáticamente seleccionar la categoría creada para el nuevo gasto
        setNuevoGasto(prev => ({ ...prev, idCategoriaGasto: categoriaCreada.idCategoriaGasto, categoria: categoriaCreada }))
=======

        setCategorias((prev) => [...prev, categoriaCreada])
        setNuevoGasto((prev) => ({
          ...prev,
          idCategoriaGasto: categoriaCreada.id ?? categoriaCreada.idCategoriaGasto ?? prev.idCategoriaGasto,
        }))
>>>>>>> Stashed changes
        setModoCrearCategoria(false)
        setNuevaCategoria({ nombre: "" })
      } else {
        mostrarNotificacion("Error al crear la categoría", "error")
      }
    } catch (error) {
      console.error("Error al crear categoría:", error)
<<<<<<< Updated upstream
=======
      mostrarNotificacion("Error al crear categoría", "error")
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
  // Helper: obtener nombre de categoría desde id
  const nombreCategoriaPorId = (idCategoriaGasto) => {
    if (idCategoriaGasto == null) return null
    const found = categorias.find((c) =>
      // soportar distintas claves que pueda devolver el backend
      c.id === idCategoriaGasto ||
      c.idCategoriaGasto === idCategoriaGasto ||
      c.idCategoria === idCategoriaGasto
    )
    return found ? (found.nombre ?? found.Nombre ?? found.name ?? null) : null
  }

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
        {gastos.map((gasto) => {
          const nombreCat = nombreCategoriaPorId(gasto.idCategoriaGasto)
          return (
            <div key={gasto.id} className="p-4 bg-white rounded-xl shadow flex justify-between">
              <div>
                <p className="font-semibold">{gasto.descripcion}</p>
                <p className="text-sm text-gray-600">
                  {nombreCat ?? "Sin categoría"} — ${gasto.monto}
                </p>
              </div>
              <button onClick={() => eliminarGasto(gasto.id)} className="text-red-500 hover:underline">
                Eliminar
              </button>
            </div>
          )
        })}
>>>>>>> Stashed changes
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
                  <label className="label">Categoría (opcional)</label>
                  <select
                    className="input"
                    value={nuevoGasto.idCategoriaGasto ?? ""}
                    onChange={(e) => {
                      const valor = e.target.value
<<<<<<< Updated upstream
                      if (!valor) {
                        setCategoriaSeleccionada(null)
                        setNuevoGasto({ ...nuevoGasto, idCategoriaGasto: "", categoria: null })
                        return
                      }
                      const idSeleccionado = parseInt(valor, 10)
                      const seleccionada = categorias.find(c => c.idCategoriaGasto === idSeleccionado) || null
                      setCategoriaSeleccionada(seleccionada)
                      setNuevoGasto({ ...nuevoGasto, idCategoriaGasto: idSeleccionado, categoria: seleccionada })
=======
                      setNuevoGasto({
                        ...nuevoGasto,
                        idCategoriaGasto: valor ? parseInt(valor, 10) : null,
                      })
>>>>>>> Stashed changes
                    }}
                  >
                    <option value="">Sin categoría</option>
                    {categorias.map((categoria) => (
<<<<<<< Updated upstream
                      <option key={categoria.idCategoriaGasto} value={categoria.idCategoriaGasto}>
                        {categoria.nombre}
=======
                      <option
                        key={categoria.id ?? categoria.idCategoriaGasto ?? categoria.idCategoria}
                        value={categoria.id ?? categoria.idCategoriaGasto ?? categoria.idCategoria}
                      >
                        {categoria.nombre ?? categoria.Nombre}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                  <button type="button" onClick={() => { setMostrarModal(false); setModoCrearCategoria(false) }} className="btn bg-gray-300 text-black">
=======
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarModal(false)
                      setModoCrearCategoria(false)
                      setNuevoGasto({
                        descripcion: "",
                        monto: "",
                        idCategoriaGasto: null,
                        idPersonaGasto: usuario?.id ?? null,
                      })
                    }}
                    className="btn bg-gray-300 text-black"
                  >
>>>>>>> Stashed changes
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
