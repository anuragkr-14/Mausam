import { useEffect, useState } from "react";

import WelcomeScreen from "./components/WelcomeScreen";
import ProfileSelection from "./components/ProfileSelection";
import LocationSelection from "./components/LocationSelection";
import Dashboard from "./components/Dashboard";

import { getWeather } from "./services/weatherService";
import { normalizeWeather } from "./utils/weatherUtils";

export default function App() {
  const [screen, setScreen] = useState("welcome");

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [language, setLanguage] = useState(
    localStorage.getItem("mausam-language") || "en"
  );

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  /* -------------------------------------------------------
     SAVE LANGUAGE
  ------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem("mausam-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
  }, [language]);


  /* -------------------------------------------------------
     FETCH LIVE WEATHER WHEN CITY CHANGES
  ------------------------------------------------------- */

  useEffect(() => {
    if (
      selectedCity?.latitude == null ||
      selectedCity?.longitude == null
    ) {
      setWeather(null);
      return;
    }

    let cancelled = false;

    async function loadWeather() {
      try {
        setWeatherLoading(true);
        setWeatherError(null);
        setWeather(null);

        const data = await getWeather(
          selectedCity.latitude,
          selectedCity.longitude
        );

        const normalizedWeather = normalizeWeather(data);

        // Prevent an old request from updating the UI
        if (!cancelled) {
          setWeather(normalizedWeather);
        }
      } catch (error) {
        console.error("Weather loading failed:", error);

        if (!cancelled) {
          setWeather(null);
          setWeatherError("weatherUnavailable");
        }
      } finally {
        if (!cancelled) {
          setWeatherLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      cancelled = true;
    };
  }, [selectedCity]);


  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */

  return (
    <>
      {/* ================= WELCOME ================= */}

      {screen === "welcome" && (
        <WelcomeScreen
          onStart={() => setScreen("profile")}
          language={language}
          setLanguage={setLanguage}
        />
      )}


      {/* ================= PROFILE ================= */}

      {screen === "profile" && (
        <ProfileSelection
          selectedProfile={selectedProfile}
          onSelect={setSelectedProfile}
          onContinue={() => {
            if (selectedProfile) {
              setScreen("location");
            }
          }}
          onBack={() => setScreen("welcome")}
          language={language}
          setLanguage={setLanguage}
        />
      )}


      {/* ================= LOCATION ================= */}

      {screen === "location" && (
        <LocationSelection
          selectedCity={selectedCity}
          onSelect={setSelectedCity}
          onContinue={() => {
            if (selectedCity) {
              setScreen("dashboard");
            }
          }}
          onBack={() => setScreen("profile")}
          language={language}
          setLanguage={setLanguage}
        />
      )}


      {/* ================= DASHBOARD ================= */}

      {screen === "dashboard" && (
        <Dashboard
          profile={selectedProfile}
          setProfile={setSelectedProfile}
          city={selectedCity}
          weather={weather}
          weatherLoading={weatherLoading}
          weatherError={weatherError}
          onBack={() => setScreen("location")}
          language={language}
          setLanguage={setLanguage}
        />
      )}
    </>
  );
}