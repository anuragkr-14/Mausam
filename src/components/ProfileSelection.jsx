import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { profiles } from "../data/mausamData";
import { languages } from "../data/languages";
import LanguageSwitcher from "./LanguageSwitcher";

export default function ProfileSelection({ selectedProfile, onSelect, onContinue, onBack, language = "en", setLanguage }) {
  const text = languages[language] || languages.en;
  const t = (key, fallback = "") => text[key] ?? languages.en[key] ?? fallback;

  return (
    <div className="app-shell min-h-screen">
      <div className="relative mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <div className="absolute right-5 top-6 z-20 sm:right-8 sm:top-8">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
        <button onClick={onBack} aria-label={t("goBack")} className="mb-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm hover:bg-slate-100"><ArrowLeft size={19}/></button>
        <div className="animate-slide-up">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-sky-500">{t("stepOne")}</p>
          <h1 className="heading-font mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{t("howUseWeather")}</h1>
          <p className="mt-4 text-base text-slate-500">{t("chooseMatters")}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {Object.values(profiles).map((profile) => {
            const Icon = profile.icon;
            const selected = selectedProfile === profile.id;
            return (
              <button key={profile.id} onClick={() => onSelect(profile.id)} className={`group relative overflow-hidden rounded-[28px] border p-6 text-left transition-all duration-300 sm:p-7 ${selected ? "border-sky-400 bg-sky-50 shadow-lg shadow-sky-100" : "border-white bg-white hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl"}`}>
                {selected && <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-white"><Check size={15} strokeWidth={3}/></div>}
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${selected ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-sky-600"}`}><Icon size={27}/></div>
                <h3 className="heading-font mt-6 text-xl font-bold text-slate-900">{t(profile.nameKey, profile.name)}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">{t(profile.descriptionKey, profile.description)}</p>
              </button>
            );
          })}
        </div>
        <button disabled={!selectedProfile} onClick={onContinue} className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-35 sm:ml-auto sm:w-auto">
          {t("continue")} <ArrowRight size={18}/>
        </button>
      </div>
    </div>
  );
}
