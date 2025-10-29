"use client"

import { NavLink, Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const tabs = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/profile", label: "Perfil", icon: "⚙️" },
  { to: "/bills", label: "Gastos", icon: "💰" },
  { to: "/report", label: "Reporte", icon: "📄" },
]

export default function Topbar() {
  const { pathname } = useLocation()
  const { logout } = useAuth()

  const handleLogout = () => {
    if (confirm("¿Estás seguro que deseas cerrar sesión?")) {
      logout()
    }
  }

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3 group">
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

          <button onClick={handleLogout} className="navlink flex items-center gap-2 text-red-600 hover:bg-red-50">
            <span className="text-base">🚪</span>
            Salir
          </button>
        </nav>

        <Link to="/profile" className="group">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-blue-600 overflow-hidden ring-2 ring-slate-100 group-hover:ring-primary/30 transition-all duration-200">
            <img src="https://i.pravatar.cc/80?img=5" alt="avatar" className="w-full h-full object-cover" />
          </div>
        </Link>
      </div>
    </header>
  )
}
