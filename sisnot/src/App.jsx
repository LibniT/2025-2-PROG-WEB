"use client"

import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import Topbar from "./components/Topbar"
import Landing from "./pages/Landing"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import Bills from "./pages/Bills"
import Report from "./pages/Report"

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const usuario = localStorage.getItem("usuario")

    // Si hay usuario logueado y está en la landing page, redirigir al dashboard
    if (usuario && location.pathname === "/") {
      navigate("/dashboard")
    }
  }, [location.pathname, navigate])

  return (
    <div className="min-h-screen">
      <Topbar />
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-20">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
