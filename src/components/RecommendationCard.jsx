import { ArrowUpRight, Lightbulb } from "lucide-react";
import { languages } from "../data/languages";

export default function RecommendationCard({ personalized, language = "en" }) {
  const text = languages[language] || languages.en;
  const t = (key, fallback = "") => text[key] ?? languages.en[key] ?? fallback;

  return (
    <div className="rounded-[26px] bg-slate-900 p-6 text-white shadow-xl sm:p-7">
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10"><Lightbulb size={20}/></div>
        <ArrowUpRight size={20} className="text-white/40"/>
      </div>
      <p className="mt-6 text-xs font-bold uppercase tracking-[.15em] text-white/40">{t("mausamRecommendation")}</p>
      <p className="mt-3 max-w-xl text-lg font-semibold leading-7">{t(personalized?.recommendationKey || "generalAdvice")}</p>
      <div className="mt-6 flex items-center gap-2 text-xs text-white/45"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400"/>{t("basedOnCurrentWeather")}</div>
    </div>
  );
}
