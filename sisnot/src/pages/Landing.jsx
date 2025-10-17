import { Link } from "react-router-dom"

function FeatureCard({ title, description, icon }) {
  return (
    <div className="card-ghost group cursor-default">
      <div className="icon-wrapper mb-6">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-10 sm:p-16 shadow-xl border border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>✨</span>
            Potenciado por Inteligencia Artificial
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Bienvenido a <span className="text-primary">SISNOT</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            Organiza tu futuro con predicciones inteligentes y alertas personalizadas para tu día a día
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/auth" className="btn text-base px-8 py-4">
              Comenzar Ahora
            </Link>
            <Link to="/dashboard" className="btn-outline text-base px-8 py-4">
              Ver Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          title="Reportes Inteligentes"
          description="Visualiza tu productividad y progreso con gráficos detallados y métricas en tiempo real"
          icon="📊"
        />
        <FeatureCard
          title="Predicciones IA"
          description="Proyecciones financieras y análisis predictivo para tomar mejores decisiones"
          icon="🧠"
        />
        <FeatureCard
          title="Alertas Personalizadas"
          description="Recordatorios inteligentes que se adaptan a tu rutina y prioridades"
          icon="🔔"
        />
      </div>
    </div>
  )
}
