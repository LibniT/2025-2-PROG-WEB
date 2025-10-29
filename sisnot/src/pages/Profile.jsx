"use client"

import { useState, useEffect } from "react"

export default function Profile() {
  const [usuario, setUsuario] = useState(null)
  const [formData, setFormData] = useState({
    edad: "",
    fechaNacimiento: "",
    profesion: "",
    telefono: "",
    intereses: "",
    biografia: "",
  })
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    let usuarioGuardado = localStorage.getItem("usuario")

    if (!usuarioGuardado) {
      // Crear usuario de prueba con el mismo ID que se usa en Bills.jsx
      const usuarioPrueba = {
        idPersona: "U001",
        nombre: "Usuario Demo",
        email: "demo@email.com",
      }
      localStorage.setItem("usuario", JSON.stringify(usuarioPrueba))
      usuarioGuardado = JSON.stringify(usuarioPrueba)
    }

    const user = JSON.parse(usuarioGuardado)
    setUsuario(user)

    const profileKey = `profile_${user.idPersona}`
    const profileData = localStorage.getItem(profileKey)

    if (profileData) {
      const parsed = JSON.parse(profileData)
      setFormData(parsed)
      setOriginalData(parsed)
    } else {
      const defaultData = {
        edad: "",
        fechaNacimiento: "",
        profesion: "",
        telefono: "",
        intereses: "",
        biografia: "",
      }
      setFormData(defaultData)
      setOriginalData(defaultData)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    if (!usuario) return

    const profileKey = `profile_${usuario.idPersona}`
    localStorage.setItem(profileKey, JSON.stringify(formData))
    setOriginalData(formData)
    alert(`Perfil actualizado correctamente para ${usuario.nombre} (ID: ${usuario.idPersona})`)
  }

  const handleCancel = () => {
    if (originalData) {
      setFormData(originalData)
    }
  }

  if (!usuario) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card">
          <p className="text-center text-slate-600">Cargando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="relative group/avatar cursor-pointer">
            <img
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-100 group-hover/avatar:ring-primary/30 transition-all"
              src="https://i.pravatar.cc/160?img=8"
              alt={usuario.nombre}
            />
            <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-2xl">📷</span>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">{usuario.nombre}</h2>
            <p className="text-slate-600 mb-4">{usuario.email}</p>
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

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Información Personal</h3>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="label">Edad</label>
                <input
                  className="input"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  type="number"
                  placeholder="Ingresa tu edad"
                />
              </div>
              <div>
                <label className="label">Fecha de Nacimiento</label>
                <input
                  className="input"
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  type="date"
                />
              </div>
              <div>
                <label className="label">Profesión</label>
                <input
                  className="input"
                  name="profesion"
                  value={formData.profesion}
                  onChange={handleChange}
                  placeholder="Ej: Diseñador Gráfico"
                />
              </div>
              <div>
                <label className="label">Teléfono</label>
                <input
                  className="input"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
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
                  name="intereses"
                  value={formData.intereses}
                  onChange={handleChange}
                  placeholder="Tecnología, Arte, Viajes (separados por comas)"
                />
              </div>
              <div>
                <label className="label">Biografía</label>
                <textarea
                  className="input min-h-[100px] resize-none"
                  name="biografia"
                  value={formData.biografia}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre ti..."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="btn" onClick={handleSave}>
              Guardar Cambios
            </button>
            <button className="btn-outline" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
  