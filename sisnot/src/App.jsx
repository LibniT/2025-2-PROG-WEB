import { Routes, Route, Navigate } from "react-router-dom"
import Topbar from "./components/Topbar"
import Landing from "./pages/Landing"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
import Gastos from "./pages/Bills"

export default function App() {
  return (
    <div className="min-h-screen">
      <Topbar />
      <main className="max-w-7xl mx-auto px-6 pt-8 pb-20">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Bills" element={<Gastos />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
  