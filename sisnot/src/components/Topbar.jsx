"use client"

import { NavLink, Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

const tabs = [
  { to: "/auth", label: "Registro", icon: "👤" },
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/profile", label: "Perfil", icon: "⚙️" },
]

export default function Topbar() {
  const { pathname } = useLocation()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const loadUserData = () => {
      const userFromLocal = localStorage.getItem("usuario")
      const userFromSession = sessionStorage.getItem("usuario")
      const userData = userFromLocal || userFromSession

      if (userData) {
        const user = JSON.parse(userData)
        // Cargar datos del perfil si existen
        const profileKey = `profile_${user.email}`
        const profileData = localStorage.getItem(profileKey)

        if (profileData) {
          const profile = JSON.parse(profileData)
          setCurrentUser({
            nombre: profile.nombre || user.nombre,
            apellido: profile.apellido || user.apellido,
            email: profile.email || user.email,
          })
        } else {
          setCurrentUser({
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
          })
        }
      }
    }

    loadUserData()

    // Escuchar cambios en localStorage para actualizar en tiempo real
    window.addEventListener("storage", loadUserData)

    return () => {
      window.removeEventListener("storage", loadUserData)
    }
  }, [pathname])

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform duration-200">
            S
          </div>
          <span className="font-bold tracking-tight text-ink text-2xl">SISNOT</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          {tabs.map((t) => (
            <NavLink
              key={t.label}
              to={t.to}
              className={({ isActive }) =>
                `navlink flex items-center gap-2 ${
                  isActive && pathname !== "/" ? "bg-primary/10 text-primary font-semibold" : ""
                }`
              }
            >
              <span className="text-base">{t.icon}</span>
              {t.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/profile" className="group flex items-center gap-3">
          <div className="hidden sm:block text-right">
            {currentUser ? (
              <>
                <p className="text-sm font-semibold text-slate-900">
                  {currentUser.nombre} {currentUser.apellido}
                </p>
                <p className="text-xs text-slate-600">{currentUser.email}</p>
              </>
            ) : (
              <p className="text-sm font-semibold text-slate-900">Invitado</p>
            )}
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-blue-600 overflow-hidden ring-2 ring-slate-100 group-hover:ring-primary/30 transition-all duration-200">
            <img src="https://i.pravatar.cc/80?img=5" alt="avatar" className="w-full h-full object-cover" />
          </div>
        </Link>
      </div>
    </header>
  )
}
