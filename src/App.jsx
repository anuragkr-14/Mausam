import { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import ProfileSelection from "./components/ProfileSelection";
import LocationSelection from "./components/LocationSelection";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <>
      {screen === "welcome" && <WelcomeScreen onStart={() => setScreen("profile")}/>}
      {screen === "profile" && <ProfileSelection
        selectedProfile={selectedProfile}
        onSelect={setSelectedProfile}
        onContinue={() => selectedProfile && setScreen("location")}
        onBack={() => setScreen("welcome")}
      />}
      {screen === "location" && <LocationSelection
        selectedCity={selectedCity}
        onSelect={setSelectedCity}
        onContinue={() => selectedCity && setScreen("dashboard")}
        onBack={() => setScreen("profile")}
      />}
      {screen === "dashboard" && <Dashboard
        selectedProfile={selectedProfile}
        selectedCity={selectedCity}
        onChangeProfile={setSelectedProfile}
        onBack={() => setScreen("location")}
      />}
    </>
  );
}