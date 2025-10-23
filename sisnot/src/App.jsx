import { Routes, Route, Navigate } from "react-router-dom"
import Topbar from "./components/Topbar"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"

function ProtectedRoute({ children }) {
  const userFromLocal = localStorage.getItem("usuario")
  const userFromSession = sessionStorage.getItem("usuario")
  const isAuthenticated = userFromLocal || userFromSession

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  return children
}

export default function App() {
  const userFromLocal = localStorage.getItem("usuario")
  const userFromSession = sessionStorage.getItem("usuario")
  const isAuthenticated = userFromLocal || userFromSession

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <main className="max-w-7xl mx-auto px-6 pt-8 pb-20">
          <Routes>
            <Route path="*" element={<Auth />} />
          </Routes>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Topbar />
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-20">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/auth" element={<Navigate to="/dashboard" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  )
}
