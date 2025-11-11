import { Routes, Route, Navigate } from "react-router-dom"
import Topbar from "./components/Topbar"
import Landing from "./pages/Landing"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Dashboard from "./pages/Dashboard"
<<<<<<< Updated upstream
import Gastos from "./pages/Bills"
=======
import Bills from "./pages/Bills"
import Report from "./pages/Report"
import IAAsistente from "./pages/Bot";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
          <Route path="/Bills" element={<Gastos />} />
=======
          <Route path="/bills" element={<Bills />} />
          <Route path="/IA" element={<IAAsistente />} />
          <Route path="/report" element={<Report />} />
>>>>>>> Stashed changes
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
  