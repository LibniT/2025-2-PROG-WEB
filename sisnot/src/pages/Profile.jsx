export default function Profile() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="relative group/avatar cursor-pointer">
            <img
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-slate-100 group-hover/avatar:ring-primary/30 transition-all"
              src="https://i.pravatar.cc/160?img=8"
              alt="Ana López"
            />
            <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-2xl">📷</span>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">Ana López</h2>
            <p className="text-slate-600 mb-4">ana.lopez@email.com</p>
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
                <input className="input" defaultValue="30" type="number" />
              </div>
              <div>
                <label className="label">Fecha de Nacimiento</label>
                <input className="input" defaultValue="1994-03-15" type="date" />
              </div>
              <div>
                <label className="label">Profesión</label>
                <input className="input" defaultValue="Diseñadora Gráfica" />
              </div>
              <div>
                <label className="label">Teléfono</label>
                <input className="input" defaultValue="+34 612 345 678" type="tel" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Intereses y Preferencias</h3>
            <div className="space-y-4">
              <div>
                <label className="label">Intereses</label>
                <input className="input" defaultValue="Tecnología, Arte, Viajes" placeholder="Separados por comas" />
              </div>
              <div>
                <label className="label">Biografía</label>
                <textarea
                  className="input min-h-[100px] resize-none"
                  placeholder="Cuéntanos sobre ti..."
                  defaultValue="Apasionada por el diseño y la tecnología. Me encanta viajar y descubrir nuevas culturas."
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button className="btn">Guardar Cambios</button>
            <button className="btn-outline">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
