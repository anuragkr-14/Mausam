import { Languages } from "lucide-react";
import { languages } from "../data/languages";

export default function LanguageSwitcher({ language, setLanguage }) {
  const availableLanguages = languages || {};
  const text = availableLanguages[language] || availableLanguages.en;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-sky-200 hover:bg-sky-50">
        <Languages size={18} className="shrink-0 text-slate-500" aria-hidden="true" />
        <label htmlFor="mausam-language" className="sr-only">{text.selectLanguage}</label>
        <select id="mausam-language" value={availableLanguages[language] ? language : "en"} onChange={(e) => setLanguage(e.target.value)} aria-label={text.selectLanguage} className="max-w-[150px] cursor-pointer bg-transparent text-sm font-medium text-slate-700 outline-none">
          {Object.entries(availableLanguages).map(([code, lang]) => <option key={code} value={code}>{lang.name}</option>)}
        </select>
      </div>
    </div>
  );
}
