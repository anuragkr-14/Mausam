import { languages } from "../data/languages";

export default function WeatherHero({ city, weather, weatherLoading, language = "en" }) {
  const text = languages[language] || languages.en;
  const t = (key, fallback = "") => text[key] ?? languages.en[key] ?? fallback;

  if (weatherLoading) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="mt-6 h-16 w-40 rounded bg-slate-200" />
          <div className="mt-4 h-4 w-32 rounded bg-slate-200" />
        </div>
        <p className="sr-only">{t("loadingWeather")}</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-slate-500">{t("weatherUnavailable")}</p>
      </div>
    );
  }

  const weatherDescription = t(weather.weatherDescriptionKey || "overcast");

  return (
    <div className="relative overflow-hidden rounded-[32px] bg-white p-7 shadow-sm sm:p-9">
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{t("currentWeather")}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">{city?.name || t("defaultCity")}</h2>
          </div>
          <div className="text-5xl" aria-label={weatherDescription}>{weather.emoji}</div>
        </div>

        <div className="mt-8 flex items-end gap-4">
          <span className="text-7xl font-extrabold tracking-[-0.07em] text-slate-900">{weather.temperature}°</span>
          <div className="pb-2">
            <p className="text-sm font-semibold text-slate-700">{weatherDescription}</p>
            <p className="mt-1 text-sm text-slate-400">{t("feelsLike")} {weather.feelsLike}°C</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-sky-50 p-4"><p className="text-[10px] font-bold uppercase text-slate-400">{t("humidity")}</p><p className="mt-1 font-bold text-slate-800">{weather.humidity}%</p></div>
          <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase text-slate-400">{t("uvIndex")}</p><p className="mt-1 font-bold text-slate-800">{weather.uvIndex}</p></div>
          <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase text-slate-400">{t("wind")}</p><p className="mt-1 font-bold text-slate-800">{weather.windSpeed} {t("kmh")}</p></div>
          <div className="rounded-2xl bg-slate-50 p-4"><p className="text-[10px] font-bold uppercase text-slate-400">{t("rainProbability")}</p><p className="mt-1 font-bold text-slate-800">{weather.precipitationProbability}{t("percent")}</p></div>
        </div>
      </div>
    </div>
  );
}
