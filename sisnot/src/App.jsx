"use client"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Topbar from "./components/Topbar"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Bills from "./pages/Bills"
import Report from "./pages/Report"
import Landing from "./pages/Landing"

function ProtectedRoute({ children }) {
  const { usuario } = useAuth()

  if (!usuario) {
    return <Navigate to="/auth" replace />
  }

  return children
}

function AuthRoute({ children }) {
  const { usuario } = useAuth()

  if (usuario) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

function AppContent() {
  const { usuario } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {usuario && <Topbar />}

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={usuario ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />} />

          <Route
            path="/auth"
            element={
              <AuthRoute>
                <Auth />
              </AuthRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <Bills />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/landing"
            element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
