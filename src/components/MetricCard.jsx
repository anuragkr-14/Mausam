import { CloudSun } from "lucide-react";

export default function MetricCard({ metric, theme }) {
  const Icon = metric?.icon || CloudSun;
  const safeTheme = theme || {
    soft: "bg-slate-50",
    text: "text-slate-700",
  };

  return (
    <div className="min-w-[170px] flex-1 rounded-2xl border border-white bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${safeTheme.soft} ${safeTheme.text}`}>
        <Icon size={18} aria-hidden="true" />
      </div>
      <p className="mt-5 text-xs font-medium text-slate-400">{metric?.label || "—"}</p>
      <p className="mt-1 text-base font-bold text-slate-800">{metric?.value ?? "—"}</p>
    </div>
  );
}
