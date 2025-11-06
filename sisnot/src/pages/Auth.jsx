"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const { login } = useAuth()

  const [loginData, setLoginData] = useState({ Email: "", Password: "" })
  const [registerData, setRegisterData] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Password: "",
  })
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!loginData.Email || !loginData.Password) {
      showNotification("Por favor completa todos los campos", "error")
      setLoading(false)
      return
    }

    const emailLimpio = loginData.Email.trim()
    const passwordLimpio = loginData.Password.trim()

    if (!emailLimpio || !passwordLimpio) {
      showNotification("Por favor completa todos los campos", "error")
      setLoading(false)
      return
    }

    console.log("[v0] Intentando login con:", { Email: emailLimpio })

    try {
      console.log("[v0] Haciendo fetch a la API...")
      const response = await fetch("https://localhost:7169/api/Personas")

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const personas = await response.json()
      console.log("[v0] Personas recibidas:", personas.length)
      console.log("[v0] Primera persona (ejemplo):", personas[0])

      const usuario = personas.find(
        (p) => p.email?.toLowerCase() === emailLimpio.toLowerCase() && p.password === passwordLimpio,
      )

      if (usuario) {
        console.log("[v0] Usuario encontrado:", usuario)
        console.log("[v0] ID del usuario:", usuario.id)
        login(usuario)
        showNotification("¡Inicio de sesión exitoso! Bienvenido de vuelta", "success")

        setTimeout(() => navigate("/dashboard"), 1000)
      } else {
        console.log("[v0] Credenciales incorrectas")
        console.log(
          "[v0] Emails en la base de datos:",
          personas.map((p) => p.email),
        )
        showNotification("Credenciales incorrectas. Verifica tu email y contraseña", "error")
      }
    } catch (error) {
      console.error("[v0] Error al iniciar sesión:", error)
      console.error("[v0] Detalles del error:", error.message)

      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        showNotification(
          "Error de conexión. Verifica que el servidor esté corriendo y que CORS esté configurado",
          "error",
        )
      } else {
        showNotification(`Error al conectar con el servidor: ${error.message}`, "error")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    const nuevoUsuario = {
      Nombre: registerData.Nombre.trim(),
      Apellido: registerData.Apellido.trim(),
      Email: registerData.Email.trim(),
      Password: registerData.Password.trim(),
      FechaRegistro: new Date().toISOString(),
    }

    console.log("[v0] Intentando registrar usuario:", { Email: nuevoUsuario.Email, Nombre: nuevoUsuario.Nombre })
    console.log("[v0] Datos a enviar:", nuevoUsuario)

    try {
      const response = await fetch("https://localhost:7169/api/Personas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoUsuario),
      })

      console.log("[v0] Respuesta del servidor:", response.status)

      if (response.ok) {
        const usuarioCreado = await response.json()
        console.log("[v0] Usuario creado exitosamente:", usuarioCreado)
        console.log("[v0] ID del usuario creado:", usuarioCreado.id)
        login(usuarioCreado)
        showNotification("¡Cuenta creada exitosamente! Bienvenido a SISNOT", "success")

        setTimeout(() => navigate("/dashboard"), 1000)
      } else {
        const errorText = await response.text()
        console.error("[v0] Error del servidor:", errorText)
        showNotification(`Error al crear la cuenta: ${response.status}`, "error")
      }
    } catch (error) {
      console.error("[v0] Error al registrar:", error)
      console.error("[v0] Detalles del error:", error.message)

      if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
        showNotification(
          "Error de conexión. Verifica que el servidor esté corriendo y que CORS esté configurado",
          "error",
        )
      } else {
        showNotification(`Error al conectar con el servidor: ${error.message}`, "error")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{notification.type === "success" ? "✓" : "✕"}</span>
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg mb-8">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all ${
              isLogin ? "bg-white text-primary shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 px-4 rounded-md font-semibold text-sm transition-all ${
              !isLogin ? "bg-white text-primary shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Crear Cuenta
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">¡Bienvenido de nuevo!</h2>
              <p className="text-slate-600">Ingresa a tu cuenta para continuar</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Correo Electrónico</label>
                <input
                  className="input"
                  type="email"
                  placeholder="tu@email.com"
                  value={loginData.Email}
                  onChange={(e) => setLoginData({ ...loginData, Email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Contraseña</label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.Password}
                  onChange={(e) => setLoginData({ ...loginData, Password: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                  <span className="text-slate-600">Recordarme</span>
                </label>
                <button type="button" className="text-primary font-medium hover:underline">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button type="submit" className="btn w-full" disabled={loading}>
                {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>

              <p className="text-center text-sm text-slate-600">
                ¿No tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-primary font-semibold hover:underline"
                >
                  Crear cuenta
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Crear Cuenta</h2>
              <p className="text-slate-600">Únete y comienza a organizar tu futuro</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">Nombre</label>
                <input
                  className="input"
                  placeholder="Juan"
                  value={registerData.Nombre}
                  onChange={(e) => setRegisterData({ ...registerData, Nombre: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Apellido</label>
                <input
                  className="input"
                  placeholder="Pérez"
                  value={registerData.Apellido}
                  onChange={(e) => setRegisterData({ ...registerData, Apellido: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Correo Electrónico</label>
                <input
                  className="input"
                  type="email"
                  placeholder="tu@email.com"
                  value={registerData.Email}
                  onChange={(e) => setRegisterData({ ...registerData, Email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Contraseña</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={registerData.Password}
                  onChange={(e) => setRegisterData({ ...registerData, Password: e.target.value })}
                  required
                  minLength={8}
                />
              </div>

              <button type="submit" className="btn w-full" disabled={loading}>
                {loading ? "Creando cuenta..." : "Crear Cuenta"}
              </button>

              <p className="text-center text-sm text-slate-600">
                ¿Ya tienes cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-primary font-semibold hover:underline"
                >
                  Iniciar sesión
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
