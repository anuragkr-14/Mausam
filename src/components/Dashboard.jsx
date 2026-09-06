import { ArrowLeft, RefreshCw } from "lucide-react";
import { profiles, cities } from "../data/mausamData";
import ProfileSwitcher from "./ProfileSwitcher";
import WeatherHero from "./WeatherHero";
import MetricCard from "./MetricCard";
import PersonalizedInsight from "./PersonalizedInsight";
import RecommendationCard from "./RecommendationCard";

export default function Dashboard({ selectedProfile, selectedCity, onChangeProfile, onBack }) {
  const profile = profiles[selectedProfile];
  const city = cities[selectedCity];
  const theme = profile.theme;

  return <div className="app-shell min-h-screen">
    <div className="mx-auto max-w-7xl px-4 py-5 sm:px-7 lg:px-10 lg:py-8">
      <header className="flex items-center justify-between">
        <button onClick={onBack} className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-sm group-hover:bg-slate-100"><ArrowLeft size={18}/></div>
          <span className="heading-font hidden text-lg font-extrabold tracking-tight text-slate-900 sm:block">MAUSAM</span>
        </button>
        <ProfileSwitcher selectedProfile={selectedProfile} onChange={onChangeProfile}/>
      </header>

      <div className="mb-7 mt-10 animate-slide-up">
        <p className="text-sm font-medium text-slate-400">Good Morning 👋</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="heading-font text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Your day, <span className="text-sky-500">understood.</span></h1>
            <p className="mt-2 text-sm text-slate-500">Weather insights personalized for your lifestyle.</p>
          </div>
          <div className={`rounded-full ${theme.soft} px-4 py-2 text-xs font-bold ${theme.text}`}>Personalized for {profile.name}</div>
        </div>
      </div>

      <div key={selectedProfile} className="animate-fade-in">
        <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
          <WeatherHero city={city}/>
          <PersonalizedInsight profile={profile} theme={theme}/>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[260px_1fr]">
          <div className="weather-shadow rounded-[28px] bg-white p-6">
            <div className="flex items-center justify-between"><p className="text-xs font-bold tracking-[.15em] text-slate-400">{profile.scoreLabel}</p><RefreshCw size={16} className="text-slate-300"/></div>
            <div className="mt-8 flex items-end gap-2"><span className="heading-font text-6xl font-bold tracking-tight text-slate-900">{profile.score}</span><span className="mb-2 text-sm text-slate-400">/100</span></div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full bg-gradient-to-r ${theme.accent} transition-all duration-700`} style={{width:`${profile.score}%`}}/></div>
            <p className="mt-4 text-sm leading-5 text-slate-500">Your current conditions are being evaluated for your lifestyle.</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-1 lg:grid lg:grid-cols-2 xl:grid-cols-3">
            {profile.metrics.map(metric => <MetricCard key={metric.label} metric={metric} theme={theme}/>)}
          </div>
        </div>

        <div className="mt-5 animate-slide-up"><RecommendationCard profile={profile}/></div>
      </div>

      <div className="py-8 text-center"><p className="text-xs font-medium tracking-wide text-slate-400">SAME WEATHER · DIFFERENT PERSON · DIFFERENT INFORMATION</p></div>
    </div>
  </div>;
}