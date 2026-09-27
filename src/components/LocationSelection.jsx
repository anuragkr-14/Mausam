import { ArrowLeft, ArrowRight, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cities } from "../data/mausamData";
import { languages } from "../data/languages";
import LanguageSwitcher from "./LanguageSwitcher";

export default function LocationSelection({ selectedCity, onSelect, onContinue, onBack, language = "en", setLanguage }) {
  const [search, setSearch] = useState("");
  const text = languages[language] || languages.en;
  const t = (key, fallback = "") => text[key] ?? languages.en[key] ?? fallback;

  const filteredCities = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return Object.values(cities);
    return Object.values(cities).filter((city) => city.name.toLowerCase().includes(query) || city.state.toLowerCase().includes(query) || city.country?.toLowerCase().includes(query));
  }, [search]);

  return (
    <div className="app-shell min-h-screen">
      <div className="relative mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <div className="absolute right-5 top-6 z-20 sm:right-8 sm:top-8">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
        <button onClick={onBack} aria-label={t("goBack")} className="mb-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm transition hover:bg-slate-100"><ArrowLeft size={19} /></button>
        <div className="animate-slide-up">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-sky-500">{t("stepTwo")}</p>
          <h1 className="heading-font mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{t("whereAreYou")}</h1>
          <p className="mt-4 text-slate-500">{t("chooseCity")}</p>
        </div>

        <div className="relative mt-9">
          <Search size={19} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <label htmlFor="city-search" className="sr-only">{t("searchCity")}</label>
          <input id="city-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("searchCity")} className="w-full rounded-2xl border border-white bg-white py-4 pl-12 pr-5 outline-none shadow-sm transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100" />
        </div>

        <div className="mt-5 space-y-3">
          {filteredCities.map((city) => {
            const selected = selectedCity?.name === city.name;
            return <button key={city.name} type="button" onClick={() => onSelect(city)} aria-pressed={selected} className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all ${selected ? "border-sky-400 bg-sky-50 shadow-md" : "border-white bg-white hover:border-sky-200 hover:shadow-md"}`}>
              <div className="flex items-center gap-4"><div className={`flex h-12 w-12 items-center justify-center rounded-xl ${selected ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"}`}><MapPin size={21} /></div><div><p className="font-bold text-slate-900">{city.name}</p><p className="mt-1 text-sm text-slate-400">{city.state}</p></div></div>
              <div className="text-2xl">{city.icon}</div>
            </button>;
          })}
          {!filteredCities.length && <div className="rounded-2xl bg-white p-8 text-center text-slate-500">{t("noCity")}</div>}
        </div>

        <button type="button" disabled={!selectedCity} onClick={onContinue} className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-35 sm:ml-auto sm:w-auto">{t("viewWeather")} <ArrowRight size={18} /></button>
      </div>
    </div>
  );
}
