"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const navigate = useNavigate()
  const [notification, setNotification] = useState(null)
  const [profileData, setProfileData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    edad: "",
    fechaNacimiento: "",
    profesion: "",
    telefono: "",
    intereses: "",
    biografia: "",
  })

  useEffect(() => {
    // Verificar si hay sesión activa (localStorage o sessionStorage)
    const userFromLocal = localStorage.getItem("usuario")
    const userFromSession = sessionStorage.getItem("usuario")
    const currentUser = userFromLocal || userFromSession

    if (!currentUser) {
      // Si no hay sesión, redirigir al login
      navigate("/auth")
      return
    }

    // Cargar datos del perfil desde localStorage
    const user = JSON.parse(currentUser)
    const profileKey = `profile_${user.email}`
    const savedProfile = localStorage.getItem(profileKey)

    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
    } else {
      // Si no hay perfil guardado, usar datos básicos del usuario
      setProfileData({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        email: user.email,
        edad: "",
        fechaNacimiento: "",
        profesion: "",
        telefono: "",
        intereses: "",
        biografia: "",
      })
    }
  }, [navigate])

  const showNotification = (message, type = "success") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveChanges = (e) => {
    e.preventDefault()

    const profileKey = `profile_${profileData.email}`
    localStorage.setItem(profileKey, JSON.stringify(profileData))

    showNotification("¡Cambios guardados exitosamente!", "success")
  }

  const handleCancel = () => {
    const profileKey = `profile_${profileData.email}`
    const savedProfile = localStorage.getItem(profileKey)

    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
      showNotification("Cambios descartados", "info")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("usuario")
    sessionStorage.removeItem("usuario")
    showNotification("Sesión cerrada exitosamente", "success")
    setTimeout(() => navigate("/auth"), 1000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : notification.type === "info"
                ? "bg-blue-500 text-white"
                : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {notification.type === "success" ? "✓" : notification.type === "info" ? "ℹ" : "✕"}
            </span>
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="card">
        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="relative group/avatar cursor-pointer">
            <img
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-100 group-hover/avatar:ring-primary/30 transition-all"
              src="https://i.pravatar.cc/160?img=8"
              alt={`${profileData.nombre} ${profileData.apellido}`}
            />
            <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-2xl">📷</span>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">
              {profileData.nombre} {profileData.apellido}
            </h2>
            <p className="text-slate-600 mb-4">{profileData.email}</p>
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                ✓ Verificado
              </span>
              <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                ⭐ Premium
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveChanges} className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Información Personal</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="label">Nombre</label>
                <input
                  className="input"
                  value={profileData.nombre}
                  onChange={(e) => handleInputChange("nombre", e.target.value)}
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="label">Apellido</label>
                <input
                  className="input"
                  value={profileData.apellido}
                  onChange={(e) => handleInputChange("apellido", e.target.value)}
                  placeholder="Tu apellido"
                />
              </div>
              <div>
                <label className="label">Edad</label>
                <input
                  className="input"
                  value={profileData.edad}
                  onChange={(e) => handleInputChange("edad", e.target.value)}
                  type="number"
                  placeholder="Tu edad"
                />
              </div>
              <div>
                <label className="label">Fecha de Nacimiento</label>
                <input
                  className="input"
                  value={profileData.fechaNacimiento}
                  onChange={(e) => handleInputChange("fechaNacimiento", e.target.value)}
                  type="date"
                />
              </div>
              <div>
                <label className="label">Profesión</label>
                <input
                  className="input"
                  value={profileData.profesion}
                  onChange={(e) => handleInputChange("profesion", e.target.value)}
                  placeholder="Tu profesión"
                />
              </div>
              <div>
                <label className="label">Teléfono</label>
                <input
                  className="input"
                  value={profileData.telefono}
                  onChange={(e) => handleInputChange("telefono", e.target.value)}
                  type="tel"
                  placeholder="+34 612 345 678"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Intereses y Preferencias</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Intereses</label>
                <input
                  className="input"
                  value={profileData.intereses}
                  onChange={(e) => handleInputChange("intereses", e.target.value)}
                  placeholder="Tecnología, Arte, Viajes (separados por comas)"
                />
              </div>
              <div>
                <label className="label">Biografía</label>
                <textarea
                  className="input min-h-[100px] resize-none"
                  placeholder="Cuéntanos sobre ti..."
                  value={profileData.biografia}
                  onChange={(e) => handleInputChange("biografia", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn">
              Guardar Cambios
            </button>
            <button type="button" onClick={handleCancel} className="btn-outline">
              Cancelar
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Cerrar Sesión</h3>
              <p className="text-sm text-slate-600">Salir de tu cuenta de SISNOT</p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all duration-200"
            >
              <span>🚪</span>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
