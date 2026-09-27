import { Sparkles } from "lucide-react";
import { languages } from "../data/languages";

export default function PersonalizedInsight({ profile, theme, personalized, weather, language = "en" }) {
  const text = languages[language] || languages.en;
  const t = (key, fallback = "") => text[key] ?? languages.en[key] ?? fallback;

  const title = t(personalized?.titleKey || "weatherConditions", t("weatherConditions"));
  const description = weather
    ? `${t(profile?.descriptionKey || "currentConditionsDescription")} ${t("currentConditionsDescription")}`
    : t("tryAgainShortly");
  const recommendation = t(personalized?.recommendationKey || "generalAdvice", t("generalAdvice"));

  const safeTheme = theme || { soft: "bg-slate-50", text: "text-slate-700" };

  return (
    <div className={`relative overflow-hidden rounded-[28px] ${safeTheme.soft} p-6 sm:p-7`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/60 blur-2xl" />
      <div className="relative">
        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] ${safeTheme.text}`}>
          <Sparkles size={14} />
          {t("personalizedFor")} {t(profile?.nameKey || "weather")}
        </div>
        <h2 className="heading-font mt-4 max-w-2xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          {description}
        </p>
        <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-slate-700">
          {recommendation}
        </p>
      </div>
    </div>
  );
}
