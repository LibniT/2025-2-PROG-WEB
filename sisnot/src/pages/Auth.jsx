"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()
  const { login } = useAuth()

  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
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

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/Personas`)
      const personas = await response.json()

      const usuario = personas.find((p) => p.email === loginData.email && p.password === loginData.password)

      if (usuario) {
        login(usuario)
        showNotification("¡Inicio de sesión exitoso! Bienvenido de vuelta", "success")
        setTimeout(() => navigate("/dashboard"), 1000)
      } else {
        showNotification("Credenciales incorrectas. Verifica tu email y contraseña", "error")
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      showNotification("Error al conectar con el servidor", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/Personas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      })

      if (response.ok) {
        const nuevoUsuario = await response.json()
        login(nuevoUsuario)
        showNotification("¡Cuenta creada exitosamente! Bienvenido a SISNOT", "success")
        setTimeout(() => navigate("/dashboard"), 1000)
      } else {
        showNotification("Error al crear la cuenta. Intenta nuevamente", "error")
      }
    } catch (error) {
      console.error("Error al registrar:", error)
      showNotification("Error al conectar con el servidor", "error")
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
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Contraseña</label>
                <input
                  className="input"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Nombre</label>
                  <input
                    className="input"
                    placeholder="Juan"
                    value={registerData.nombre}
                    onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="label">Apellido</label>
                  <input
                    className="input"
                    placeholder="Pérez"
                    value={registerData.apellido}
                    onChange={(e) => setRegisterData({ ...registerData, apellido: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label">Correo Electrónico</label>
                <input
                  className="input"
                  type="email"
                  placeholder="tu@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="label">Contraseña</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
