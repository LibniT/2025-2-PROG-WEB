export default function Stat({ label, value, trend }) {
  return (
    <div className="stat-card group cursor-default">
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors">{value}</p>
        {trend && (
          <span className={`text-sm font-semibold ${trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
            {trend}
          </span>
        )}
      </div>
    </div>
  )
}
