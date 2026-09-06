import { ArrowLeft, ArrowRight, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { cities } from "../data/mausamData";

export default function LocationSelection({ selectedCity, onSelect, onContinue, onBack }) {
  const [search, setSearch] = useState("");
  const filteredCities = useMemo(() => Object.values(cities).filter(c => c.name.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="app-shell min-h-screen">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <button onClick={onBack} className="mb-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm hover:bg-slate-100"><ArrowLeft size={19}/></button>
        <div className="animate-slide-up">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-sky-500">Step 02</p>
          <h1 className="heading-font mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Where are you?</h1>
          <p className="mt-4 text-slate-500">Choose a city to personalize your weather.</p>
        </div>
        <div className="relative mt-9">
          <Search size={19} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search city..." className="w-full rounded-2xl border border-white bg-white py-4 pl-12 pr-5 outline-none shadow-sm focus:border-sky-300 focus:ring-4 focus:ring-sky-100"/>
        </div>
        <div className="mt-5 space-y-3">
          {filteredCities.map(city => {
            const selected = selectedCity === city.name;
            return <button key={city.name} onClick={() => onSelect(city.name)} className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition-all ${selected ? "border-sky-400 bg-sky-50 shadow-md" : "border-white bg-white hover:border-sky-200 hover:shadow-md"}`}>
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${selected ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500"}`}><MapPin size={21}/></div>
                <div><p className="font-bold text-slate-900">{city.name}</p><p className="mt-1 text-sm text-slate-400">{city.state}</p></div>
              </div>
              <div className="text-2xl">{city.icon}</div>
            </button>
          })}
          {!filteredCities.length && <div className="rounded-2xl bg-white p-8 text-center text-slate-500">No matching city found.</div>}
        </div>
        <button disabled={!selectedCity} onClick={onContinue} className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-35 sm:ml-auto sm:w-auto">
          View My Weather <ArrowRight size={18}/>
        </button>
      </div>
    </div>
  );
}