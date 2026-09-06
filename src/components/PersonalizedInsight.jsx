import { Sparkles } from "lucide-react";

export default function PersonalizedInsight({ profile, theme }) {
  return <div className={`relative overflow-hidden rounded-[28px] ${theme.soft} p-6 sm:p-7`}>
    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/60 blur-2xl"/>
    <div className="relative">
      <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] ${theme.text}`}><Sparkles size={14}/>Personalized for {profile.name}</div>
      <h2 className="heading-font mt-4 max-w-2xl text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{profile.insightTitle}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{profile.insightText}</p>
    </div>
  </div>;
}