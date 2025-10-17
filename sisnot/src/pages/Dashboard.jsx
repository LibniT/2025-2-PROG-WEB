import Stat from "../components/Stat"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Productividad" value="85%" trend="+15%" />
        <Stat label="Tareas Completadas" value="45" trend="+8" />
        <Stat label="Proyección Q4" value="+10%" trend="+2%" />
        <Stat label="Alertas Activas" value="3" />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Reporte */}
        <section className="card group">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Reporte</h3>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">📈</div>
          </div>

          {/* Chart */}
          <div className="h-48 w-full bg-gradient-to-br from-primary/5 to-blue-50 rounded-2xl mb-6 relative overflow-hidden border border-primary/10">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#2563eb", stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: "#2563eb", stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <polyline
                fill="url(#grad1)"
                stroke="none"
                points="0,40 0,35 15,28 30,29 45,24 60,26 75,20 90,12 100,8 100,40"
              />
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0,35 15,28 30,29 45,24 60,26 75,20 90,12 100,8"
              />
            </svg>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Último mes</span>
              <span className="font-bold text-green-600">+15%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Tareas completadas</span>
              <span className="font-bold text-slate-900">45 / 52</span>
            </div>
          </div>
        </section>

        {/* Predicción */}
        <section className="card group">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Predicción</h3>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">🎯</div>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <svg width="180" height="180" viewBox="0 0 180 180" className="mb-6">
              <defs>
                <linearGradient id="circleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#2563eb", stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: "#2563eb", stopOpacity: 0.05 }} />
                </linearGradient>
              </defs>
              <circle cx="90" cy="90" r="70" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              {Array.from({ length: 8 }).map((_, i) => {
                const ang = (i / 8) * Math.PI * 2 - Math.PI / 2
                const x = 90 + Math.cos(ang) * 60
                const y = 90 + Math.sin(ang) * 60
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="5"
                    fill="#2563eb"
                    className="animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                )
              })}
              <circle cx="90" cy="90" r="35" fill="url(#circleGrad)" />
              <text x="90" y="95" textAnchor="middle" className="text-2xl font-bold fill-primary">
                +10%
              </text>
            </svg>

            <div className="text-center space-y-2">
              <p className="font-semibold text-slate-900">Proyección Financiera Q4</p>
              <p className="text-sm text-slate-600">
                Ganancias estimadas: <span className="font-semibold text-green-600">+10%</span>
              </p>
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium mt-2">
                <span>⚠️</span>
                Estrés: Moderado
              </div>
            </div>
          </div>
        </section>

        {/* Alerta */}
        <section className="card group">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Alertas</h3>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">🔔</div>
          </div>

          <p className="text-sm text-slate-600 mb-4 font-medium">Recordatorios Próximos</p>

          <ul className="space-y-3">
            {[
              { title: "Pagar Factura", time: "3 Días", icon: "💳", color: "red" },
              { title: "Reunión Equipo", time: "Mañana", icon: "👥", color: "blue" },
              { title: "Chequeo Salud", time: "1 Semana", icon: "🏥", color: "green" },
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group/item"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-${item.color}-50 flex items-center justify-center text-xl flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 group-hover/item:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
                <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover/item:opacity-100 transition-opacity" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
