import { ArrowLeft, MapPin, RefreshCw, ChevronDown } from "lucide-react";

import WeatherHero from "./WeatherHero";
import ProfileSwitcher from "./ProfileSwitcher";
import PersonalizedInsight from "./PersonalizedInsight";
import MetricCard from "./MetricCard";
import RecommendationCard from "./RecommendationCard";
import LanguageSwitcher from "./LanguageSwitcher";

import { languages } from "../data/languages";
import { getGreeting } from "../utils/timeUtils";
import { getPersonalizedData } from "../utils/personalization";

export default function Dashboard({
  profile,
  setProfile,
  city,
  weather,
  weatherLoading,
  weatherError,
  onBack,
  language = "en",
  setLanguage,
}) {
  const text = languages[language] || languages.en;

  /* -------------------------------------------------------
     TRANSLATION HELPERS
  ------------------------------------------------------- */

  const t = (key, fallback = "") => text[key] ?? languages.en?.[key] ?? fallback;

  /* -------------------------------------------------------
     GREETING
  ------------------------------------------------------- */

  const greetingKey = getGreeting();
  const greeting = t(greetingKey, languages.en?.[greetingKey] || greetingKey);

  /* -------------------------------------------------------
     PERSONALIZATION
  ------------------------------------------------------- */

  const personalized = getPersonalizedData(
    profile?.id,
    weather
  );



  /* -------------------------------------------------------
     DYNAMIC PROFILE SCORE
  ------------------------------------------------------- */

  const calculateScore = () => {
    if (!weather) {
      return Number(profile?.score) || 0;
    }

    const rain = weather.precipitationProbability ?? 0;
    const uv = weather.uvIndex ?? 0;
    const temperature = weather.temperature ?? 25;
    const humidity = weather.humidity ?? 50;
    const wind = weather.windSpeed ?? 0;
    const visibility = weather.visibility;

    let score = 100;

    switch (profile?.id) {
      case "fitness":
        score -= Math.min(rain * 0.35, 35);
        score -= Math.min(Math.max(uv - 5, 0) * 4, 20);
        score -= Math.min(Math.max(temperature - 30, 0) * 2, 15);
        score -= Math.min(Math.max(wind - 25, 0) * 0.7, 10);
        break;

      case "health":
        score -= Math.min(Math.max(uv - 5, 0) * 4, 20);
        score -= Math.min(Math.max(humidity - 70, 0) * 0.35, 12);
        score -= Math.min(Math.max(temperature - 30, 0) * 2, 15);
        break;

      case "traveler":
        score -= Math.min(rain * 0.3, 30);
        score -= Math.min(Math.max(wind - 25, 0) * 0.6, 12);

        if (
          visibility !== null &&
          visibility !== undefined &&
          visibility < 5
        ) {
          score -= Math.min((5 - visibility) * 6, 20);
        }
        break;

      case "commuter":
        score -= Math.min(rain * 0.4, 35);
        score -= Math.min(Math.max(wind - 25, 0) * 0.5, 10);

        if (
          visibility !== null &&
          visibility !== undefined &&
          visibility < 5
        ) {
          score -= Math.min((5 - visibility) * 7, 25);
        }
        break;

      default:
        break;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
  };

  const score = calculateScore();


  /* -------------------------------------------------------
     SCORE LABEL
  ------------------------------------------------------- */

  const getScoreLabel = () => {
    if (score >= 80) {
      return t("excellent", "Excellent");
    }

    if (score >= 60) {
      return t("good", "Good");
    }

    return t("moderate", "Moderate");
  };


  /* -------------------------------------------------------
     PROFILE-SPECIFIC LIVE METRICS
  ------------------------------------------------------- */

  const getProfileMetrics = () => {
    if (!weather) {
      return (profile?.metrics || []).map((metric) => ({
        ...metric,
        label: metric.labelKey ? t(metric.labelKey, metric.label) : metric.label,
      }));
    }

    const temperature = `${weather.temperature ?? "--"}${t("celsius")}`;
    const feelsLike = `${weather.feelsLike ?? "--"}${t("celsius")}`;
    const humidity = `${weather.humidity ?? "--"}${t("percent")}`;
    const uvIndex = weather.uvIndex ?? "--";
    const wind = `${weather.windSpeed ?? "--"} ${t("kmh")}`;
    const rainProbability = `${weather.precipitationProbability ?? 0}${t("percent")}`;

    const visibility =
      weather.visibility !== null &&
      weather.visibility !== undefined
        ? `${weather.visibility} ${t("kmUnit")}`
        : "--";

    switch (profile?.id) {
      case "fitness":
        return [
          {
            label: t("temperature", "Temperature"),
            value: temperature,
          },
          {
            label: t("uvIndex", "UV Index"),
            value: uvIndex,
          },
          {
            label: t("wind", "Wind"),
            value: wind,
          },
          {
            label: t("rainProbability", "Rain Probability"),
            value: rainProbability,
          },
        ];

      case "health":
        return [
          {
            label: t("humidity", "Humidity"),
            value: humidity,
          },
          {
            label: t("uvIndex", "UV Index"),
            value: uvIndex,
          },
          {
            label: t("temperature", "Temperature"),
            value: temperature,
          },
          {
            label: t("feelsLike", "Feels Like"),
            value: feelsLike,
          },
        ];

      case "traveler":
        return [
          {
            label: t("temperature", "Temperature"),
            value: temperature,
          },
          {
            label: t("rainProbability", "Rain Probability"),
            value: rainProbability,
          },
          {
            label: t("wind", "Wind"),
            value: wind,
          },
          {
            label: t("visibility", "Visibility"),
            value: visibility,
          },
        ];

      case "commuter":
        return [
          {
            label: t("rainProbability", "Rain Probability"),
            value: rainProbability,
          },
          {
            label: t("visibility", "Visibility"),
            value: visibility,
          },
          {
            label: t("wind", "Wind"),
            value: wind,
          },
          {
            label: t("temperature", "Temperature"),
            value: temperature,
          },
        ];

      default:
        return [
          {
            label: t("temperature", "Temperature"),
            value: temperature,
          },
          {
            label: t("humidity", "Humidity"),
            value: humidity,
          },
          {
            label: t("wind", "Wind"),
            value: wind,
          },
          {
            label: t("rainProbability", "Rain Probability"),
            value: rainProbability,
          },
        ];
    }
  };

  const metrics = getProfileMetrics();


  /* -------------------------------------------------------
     CITY NAME
  ------------------------------------------------------- */

  const cityName =
    city?.name ||
    city ||
    t("defaultCity", "Bengaluru");


  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

          {/* LEFT */}

          <div className="flex items-center gap-4">

            <button
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
              aria-label={t("goBack", "Go back")}
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="heading-font text-xl font-extrabold tracking-tight text-slate-900">
                MAUSAM
              </h1>

              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin size={12} />

                <span>{cityName}</span>
              </div>
            </div>
          </div>


          {/* RIGHT */}

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500 sm:block">
              {text.name || "MAUSAM"}
            </div>
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
          </div>
        </div>
      </header>


      {/* ================= MAIN ================= */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">

        {/* ================= PROFILE HEADER ================= */}

        <div
          data-profile-switcher
          className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              {t("personalizedFor", "Personalized for")}
            </p>

            <h2 className="heading-font mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {t(profile?.fullNameKey || profile?.nameKey || "yourWeather", profile?.fullName || profile?.name || t("yourWeather"))}
            </h2>

          </div>

          <ProfileSwitcher
            selectedProfile={profile?.id}
            onChange={setProfile}
            language={language}
          />
        </div>


        {/* ================= GREETING ================= */}

        <section className="mb-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-medium text-slate-400">
                {greeting}
              </p>

              <h2 className="heading-font mt-1 max-w-2xl text-4xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-5xl">
                {t("yourDay", "Your day, understood.")}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                {t("personalizedWeatherDescription")}
              </p>

            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-xs font-bold text-sky-600">

              <span className="h-2 w-2 animate-pulse rounded-full bg-sky-500" />

              {t("personalized", "Personalized")}

            </div>

          </div>

        </section>


        {/* ================= WEATHER ERROR ================= */}

        {weatherError && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
            {weatherError}
          </div>
        )}


        {/* ================= WEATHER HERO ================= */}

        <section className="mb-6">

          <WeatherHero
            profile={profile}
            city={city}
            weather={weather}
            weatherLoading={weatherLoading}
            language={language}
          />

        </section>


        {/* ================= INSIGHT + SCORE ================= */}

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">

          {/* PERSONALIZED INSIGHT */}

          <PersonalizedInsight
            profile={profile}
            theme={profile?.theme}
            weather={weather}
            personalized={personalized}
            language={language}
          />


          {/* PROFILE SCORE */}

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  {profile?.scoreLabel ||
                    t("personalizedScore", "PERSONALIZED SCORE")}
                </p>

                <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900">
                  {score}

                  <span className="ml-1 text-lg font-semibold text-slate-400">
                    /100
                  </span>
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                <RefreshCw size={19} />
              </div>

            </div>


            <div className="mt-6">

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-sky-500 transition-all duration-700"
                  style={{
                    width: `${score}%`,
                  }}
                />

              </div>


              <div className="mt-3 flex items-center justify-between text-xs">

                <span className="text-slate-400">
                  {t("weatherConditions", "Weather conditions")}
                </span>

                <span className="font-semibold text-slate-600">
                  {getScoreLabel()}
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ================= METRICS ================= */}

        <section className="mt-8">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                {text.today || t("today", "Today")}
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {t("whatMattersToYou", "What matters to you")}
              </h3>

            </div>


            <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">

              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              {weatherLoading
                ? t("updating", "Updating...")
                : t("liveConditions", "Live conditions")}

            </div>

          </div>


          <div className="-mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">

            <div className="flex min-w-max gap-4 sm:grid sm:min-w-0 sm:grid-cols-2 lg:grid-cols-4">

              {weatherLoading ? (
                <>
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-28 w-44 animate-pulse rounded-2xl bg-white shadow-sm sm:w-auto"
                    />
                  ))}
                </>
              ) : (
                metrics.map((metric, index) => (
                  <MetricCard
                    key={`${metric.labelKey || metric.label}-${index}`}
                    metric={metric}
                    theme={profile?.theme}
                    language={language}
                  />
                ))
              )}

            </div>

          </div>

        </section>


        {/* ================= RECOMMENDATION ================= */}

        <section className="mt-8">

          <RecommendationCard
            personalized={personalized}
            language={language}
          />

        </section>


        {/* ================= PROFILE SWITCH DEMO ================= */}

        <section className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="h-2 w-2 rounded-full bg-sky-500" />

                <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                  {t("personalization", "Personalization")}
                </p>

              </div>


              <h3 className="mt-2 text-lg font-bold text-slate-900">
                {t(
                  "seeWeatherDifferently",
                  "See weather differently"
                )}
              </h3>


              <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                {t("profileSwitchDescription")}
              </p>

            </div>


            <button
              onClick={() => {
                const element = document.querySelector(
                  "[data-profile-switcher]"
                );

                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
              className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
            >
              {t("switchProfile")}

              <ChevronDown size={16} />
            </button>

          </div>

        </section>


        {/* ================= FOOTER ================= */}

        <footer className="mt-12 border-t border-slate-200 pt-6 text-center">

          <p className="text-[10px] font-bold tracking-[0.25em] text-slate-300 sm:text-xs">
            {t("mausamTagline")}
          </p>

          <p className="mt-2 text-xs text-slate-400">
            MAUSAM · {t("mausamSubtitle")}
          </p>

        </footer>

      </main>

    </div>
  );
}