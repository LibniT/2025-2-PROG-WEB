
"use client"

import { useEffect, useState, useRef } from "react"
import { useAuth } from "../context/AuthContext"
import { GoogleGenerativeAI } from "@google/generative-ai"
<<<<<<< HEAD
import { ESTIMACION_GASTOS, CONSEJO_FINANCIERO } from "./contexAI"

export default function IAAsistente() {
  // lee la API key desde variables de entorno Vite
  const API_KEY = "";//Debes añadir la clave API KEY GEMINI
=======
import { ESTIMACION_GASTOS, CONSEJO_FINANCIERO } from "./contextAI"

export default function IAAsistente() {
  // lee la API key desde variables de entorno Vite
  
  const API_KEY = "AIzaSyAkzI9WPibItAW5cpT5fFbc7oeIwCAhCWc";//Debes añadir la clave API KEY GEMINI

>>>>>>> 2b1ac24 (Dios los bendiga. Aplicacion con AI y filtrado por usuario)
  // NOTA: por seguridad lo ideal es no exponer la API KEY en el cliente.
  // Si no quieres exponerla, crea un endpoint en tu backend que haga la llamada a Gemini.

  const genAIRef = useRef(null) // guardamos la instancia si es necesario reutilizarla

  const { usuario } = useAuth()

  const context = {
    ESTIMACION_GASTOS,
    CONSEJO_FINANCIERO,
  }

  const [opcion, setOpcion] = useState("estipularGastos") // valor inicial coherente
  const [mensaje, setMensaje] = useState("")
  const [respuesta, setRespuesta] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [contextoPeticion, setContexto] = useState(context.ESTIMACION_GASTOS)
  const [gastos, setGastos] = useState([])

  // Inicializar genAI solo si hay API_KEY
  useEffect(() => {
    if (!API_KEY) {
      genAIRef.current = null
      return
    }
    try {
      genAIRef.current = new GoogleGenerativeAI(API_KEY)
    } catch (err) {
      console.warn("No se pudo inicializar GoogleGenerativeAI en cliente:", err)
      genAIRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API_KEY])

  // Cargar gastos cuando usuario esté disponible
  useEffect(() => {
    if (!usuario || !usuario.id) return
    cargarGastos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuario])

  // Si cambias la opción, actualiza el contexto y el contenido del mensaje
  useEffect(() => {
    if (opcion === "estipularGastos") {
      setContexto(context.ESTIMACION_GASTOS)
      // si ya tenemos gastos cargados, insertar su JSON como mensaje
      setMensaje(gastos && gastos.length > 0 ? JSON.stringify(gastos, null, 2) : "")
    } else if (opcion === "consejo") {
      setContexto(context.CONSEJO_FINANCIERO)
      setMensaje("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opcion])

  const manejarEnvio = async (e) => {
    e.preventDefault()
    setError(null)
    setRespuesta("")

    if (!usuario || !usuario.id) {
      setError("Debes iniciar sesión para usar el asistente.")
      return
    }

    if (!contextoPeticion) {
      setError("No hay contexto disponible para la petición.")
      return
    }

    // para consejos, pedimos texto (si no hay texto, pedir que escriban)
    if (opcion === "consejo" && (!mensaje || !mensaje.trim())) {
      setError("Escribe tu consulta antes de enviar.")
      return
    }

    // Para estipular gastos, permitimos que mensaje contenga el JSON de gastos (si lo hay)
    const promptCompleto = `${contextoPeticion}\n\n**Tarea/Pregunta:**\n${mensaje || ""}`

    setLoading(true)

    try {
      if (!genAIRef.current) {
        throw new Error(
          "No se pudo inicializar la librería de Gemini en el cliente. Revisa VITE_GEMINI_API_KEY o usa backend proxy."
        )
      }

      // sigue la misma forma que tenías: obtener modelo y generateContent
      const model = genAIRef.current.getGenerativeModel({ model: "gemini-2.5-flash" })

      // generateContent acepta un prompt string en tu enfoque original
      const result = await model.generateContent(promptCompleto)

      // En tus ejemplos anteriores: result.response y response.text()
      const response = await result.response
      // response.text() puede ser síncrono o promesa; await por seguridad
      const text = await response.text()

      // guarda la respuesta
      setRespuesta(text)
    } catch (err) {
      console.error("Error al llamar a Gemini:", err)
      setError(
        err?.message ||
          "Ocurrió un error al generar la respuesta con Gemini. Revisa la consola del navegador y la llave API."
      )
    } finally {
      setLoading(false)
    }
  }

  const cargarGastos = async () => {
    if (!usuario || !usuario.id) {
      console.warn("No hay usuario para cargar gastos.")
      return
    }

    try {
      setError(null)
      const res = await fetch(`${import.meta.env.VITE_API_URI}/Gasto/User/${usuario.id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      if (!res.ok) {
        // intenta leer texto para debugging
        const txt = await res.text().catch(() => "")
        throw new Error(`Error al cargar gastos: ${res.status} ${txt}`)
      }

      const data = await res.json()

      // data debería ser un array de gastos según tu API
      if (!Array.isArray(data)) {
        console.warn("La respuesta de /Gasto/User no es un array:", data)
        setGastos([])
        return
      }

      setGastos(data)

      // si la opción es estipularGastos actualizamos el mensaje con los gastos
      if (opcion === "estipularGastos") {
        setMensaje(JSON.stringify(data, null, 2))
      }
    } catch (err) {
      console.error("Error al cargar gastos:", err)
      setError("No se pudieron cargar los gastos. Revisa la API.")
      setGastos([])
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">🤖 Asistente Inteligente de Finanzas</h2>

      <form onSubmit={manejarEnvio} className="space-y-4">
        <div>
          <label className="block text-slate-600 font-medium mb-2">¿Qué deseas que la IA haga?</label>
          <select
            className="w-full border rounded-lg p-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={opcion}
            onChange={(e) => setOpcion(e.target.value)}
          >
            <option value="estipularGastos">📊 Estipular/generar cálculo de gastos futuros</option>
            <option value="consejo">💡 Pedir consejos sobre gastos</option>
          </select>
        </div>

        {/* textarea solo para 'consejo' */}
        {opcion === "consejo" && (
          <div>
            <label className="block text-slate-600 font-medium mb-2">Describe tu consulta o contexto</label>
            <textarea
              className="w-full h-28 border rounded-lg p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Ej: Tengo muchos gastos en comida y transporte, ¿cómo los reduzco?"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>
        )}

        {/* si es estipularGastos no mostramos textarea — el mensaje se rellena con el JSON de gastos */}
        {opcion === "estipularGastos" && (
          <div className="text-sm text-slate-600">
            {gastos.length > 0 ? (
              <p className="mb-2">Se usarán tus gastos cargados como contexto (JSON).</p>
            ) : (
              <p className="mb-2">Aún no hay gastos; se enviará un prompt vacío de gastos.</p>
            )}
          </div>
        )}

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Procesando..." : "Enviar a la IA"}
          </button>

          <button
            type="button"
            onClick={() => {
              setRespuesta("")
              setMensaje(opcion === "estipularGastos" ? JSON.stringify(gastos, null, 2) : "")
              setError(null)
            }}
            className="btn bg-gray-200 text-black px-4 rounded-lg"
          >
            Limpiar
          </button>
        </div>
      </form>

      {respuesta && (
        <div className="mt-6 bg-slate-50 border border-slate-200 p-4 rounded-lg">
          <h3 className="font-semibold text-slate-700 mb-2">🧩 Respuesta de la IA:</h3>
          <p className="text-slate-800 whitespace-pre-line">{respuesta}</p>
        </div>
      )}
    </div>
  )
}
