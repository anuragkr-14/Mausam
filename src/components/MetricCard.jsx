export default function MetricCard({ metric, theme }) {
  const Icon = metric.icon;
  return <div className="min-w-[170px] flex-1 rounded-2xl border border-white bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.soft} ${theme.text}`}><Icon size={18}/></div>
    <p className="mt-5 text-xs font-medium text-slate-400">{metric.label}</p>
    <p className="mt-1 text-base font-bold text-slate-800">{metric.value}</p>
  </div>;
}