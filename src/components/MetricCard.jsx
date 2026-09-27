import { languages } from "../data/languages";

export default function MetricCard({ metric, theme, language = "en" }) {
  const Icon = metric.icon;
  const text = languages[language] || languages.en;
  const t = (key, fallback = "") => text[key] ?? languages.en[key] ?? fallback;
  const value = metric.valueKey ? t(metric.valueKey, metric.value) : metric.value;
  const unit = metric.valueUnitKey ? `${metric.valueUnitKey === "celsius" || metric.valueUnitKey === "percent" ? "" : " "}${t(metric.valueUnitKey)}` : "";
  const suffix = metric.valueSuffixKey ? ` · ${t(metric.valueSuffixKey)}` : "";

  return (
    <div className="min-w-[170px] flex-1 rounded-2xl border border-white bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.soft} ${theme.text}`}><Icon size={18}/></div>
      <p className="mt-5 text-xs font-medium text-slate-400">{metric.labelKey ? t(metric.labelKey, metric.label) : metric.label}</p>
      <p className="mt-1 text-base font-bold text-slate-800">{value}{unit}{suffix}</p>
    </div>
  );
}
