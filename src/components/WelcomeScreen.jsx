import { ArrowRight, CloudSun, Sparkles } from "lucide-react";

export default function WelcomeScreen({ onStart }) {
  return (
    <div className="app-shell min-h-screen overflow-hidden">
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-5 py-8 sm:px-10">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="relative grid w-full items-center gap-14 lg:grid-cols-2">
          <div className="animate-slide-up">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur">
              <Sparkles size={15} className="text-sky-500" />
              Personalized weather intelligence
            </div>
            <h1 className="heading-font text-6xl font-extrabold tracking-[-0.05em] text-slate-900 sm:text-7xl lg:text-8xl">MAUSAM</h1>
            <p className="heading-font mt-5 max-w-xl text-2xl font-semibold leading-tight text-slate-700 sm:text-3xl">
              Weather that <span className="text-sky-500">understands you.</span>
            </p>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-500 sm:text-lg">
              Personalized weather insights designed around the way you live.
            </p>
            <button onClick={onStart} className="group mt-9 inline-flex items-center gap-3 rounded-2xl bg-slate-900 px-7 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-sky-600 active:scale-[.98]">
              Get Started <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute left-8 top-16 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="relative mx-auto max-w-md animate-float">
              <div className="weather-shadow rounded-[40px] border border-white/80 bg-white/75 p-7 backdrop-blur-2xl">
                <div className="flex items-center justify-between">
                  <div><p className="text-sm font-medium text-slate-400">TODAY</p><p className="mt-1 text-lg font-bold text-slate-800">Bengaluru</p></div>
                  <CloudSun className="text-sky-500" size={30} />
                </div>
                <div className="mt-12 flex items-center gap-5">
                  <div className="text-7xl">☀️</div>
                  <div><div className="heading-font text-7xl font-bold tracking-[-.07em] text-slate-900">31°</div><p className="mt-2 text-sm text-slate-500">Feels like 34°C</p></div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-sky-50 p-4"><p className="text-xs text-slate-400">UV INDEX</p><p className="mt-1 font-bold text-sky-700">8 · High</p></div>
                  <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs text-slate-400">HUMIDITY</p><p className="mt-1 font-bold text-slate-700">68%</p></div>
                </div>
              </div>
              <div className="absolute -right-8 top-28 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Personalized</p>
                <p className="mt-1 text-sm font-bold text-slate-800">For your lifestyle</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}