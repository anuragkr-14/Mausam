import { MapPin } from "lucide-react";

export default function WeatherHero({ city }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-6 text-white shadow-xl sm:p-8">
      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-sky-400/20 blur-3xl"/>
      <div className="relative">
        <div className="flex items-center gap-2 text-sm text-white/65"><MapPin size={15}/>{city.name}, {city.state.split(",")[0]}</div>
        <div className="mt-8 flex items-center justify-between">
          <div><div className="heading-font text-7xl font-bold tracking-[-.07em] sm:text-8xl">{city.temperature}</div><p className="mt-2 text-sm text-white/60">Feels like {city.feelsLike}</p></div>
          <div className="text-7xl drop-shadow-lg sm:text-8xl">{city.icon}</div>
        </div>
        <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5"><p className="font-medium">{city.condition}</p><p className="text-sm text-white/55">Today · Demo data</p></div>
      </div>
    </div>
  );
}