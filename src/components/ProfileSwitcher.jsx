import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profiles } from "../data/mausamData";

export default function ProfileSwitcher({ selectedProfile, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = profiles[selectedProfile];
  const CurrentIcon = current.icon;

  useEffect(() => {
    const close = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-3 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-sm hover:shadow-md">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><CurrentIcon size={17}/></div>
        <div className="hidden text-left sm:block"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Profile</p><p className="text-sm font-bold text-slate-800">{current.name}</p></div>
        <ChevronDown size={16} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}/>
      </button>
      {open && <div className="absolute right-0 top-[calc(100%+10px)] z-30 w-64 animate-fade-in rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl">
        <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400">Choose profile</p>
        {Object.values(profiles).map(profile => {
          const Icon = profile.icon;
          return <button key={profile.id} onClick={() => { onChange(profile.id); setOpen(false); }} className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-slate-50">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600"><Icon size={17}/></div>
            <div className="flex-1"><p className="text-sm font-semibold text-slate-800">{profile.name}</p><p className="text-xs text-slate-400">{profile.description}</p></div>
            {selectedProfile === profile.id && <Check size={16} className="text-sky-500"/>}
          </button>;
        })}
      </div>}
    </div>
  );
}