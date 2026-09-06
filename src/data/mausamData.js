import {
  Activity, HeartPulse, Plane, Car, Wind, Sun, CloudRain,
  Sunrise, Droplets, Leaf, Eye, ShieldCheck
} from "lucide-react";

export const profiles = {
  fitness: {
    id: "fitness", name: "Fitness", fullName: "Outdoor Fitness",
    description: "Plan your outdoor workouts", icon: Activity,
    score: "72", scoreLabel: "FITNESS SCORE",
    insightTitle: "Good conditions for outdoor activity.",
    insightText: "Cooler temperatures and lower UV make the early morning the ideal window for your workout.",
    recommendation: "Best time to run is early morning before UV levels increase.",
    metrics: [
      { label: "Best Running Time", value: "6:00 – 7:30 AM", icon: Activity },
      { label: "UV Index", value: "8 · High", icon: Sun },
      { label: "Wind", value: "18 km/h", icon: Wind },
      { label: "Rain", value: "10%", icon: CloudRain },
      { label: "Sunrise", value: "5:58 AM", icon: Sunrise }
    ],
    theme: { accent: "from-sky-500 to-blue-600", soft: "bg-sky-50", text: "text-sky-700" }
  },
  health: {
    id: "health", name: "Health", fullName: "Health Conscious",
    description: "Monitor air quality and health conditions", icon: HeartPulse,
    score: "82", scoreLabel: "AIR QUALITY",
    insightTitle: "Air quality is moderate today.",
    insightText: "AQI is acceptable for most people, but sensitive individuals should monitor prolonged outdoor exposure.",
    recommendation: "Limit prolonged outdoor activity during peak UV hours.",
    metrics: [
      { label: "AQI", value: "82 · Moderate", icon: Wind },
      { label: "Pollen", value: "Moderate", icon: Leaf },
      { label: "UV Index", value: "8 · High", icon: Sun },
      { label: "Humidity", value: "68%", icon: Droplets }
    ],
    theme: { accent: "from-emerald-500 to-teal-600", soft: "bg-emerald-50", text: "text-emerald-700" }
  },
  traveler: {
    id: "traveler", name: "Traveler", fullName: "Smart Traveler",
    description: "Make every journey weather-ready", icon: Plane,
    score: "78", scoreLabel: "TRAVEL COMFORT",
    insightTitle: "Comfortable weather for your journey.",
    insightText: "Sunny conditions and a low chance of rain make today suitable for travel.",
    recommendation: "Light clothing, sunglasses and an umbrella are recommended.",
    metrics: [
      { label: "Destination Weather", value: "31°C · Sunny", icon: Sun },
      { label: "Rain Probability", value: "10%", icon: CloudRain },
      { label: "Severe Weather", value: "None", icon: ShieldCheck },
      { label: "Travel Comfort", value: "Good", icon: Plane }
    ],
    theme: { accent: "from-violet-500 to-indigo-600", soft: "bg-violet-50", text: "text-violet-700" }
  },
  commuter: {
    id: "commuter", name: "Commuter", fullName: "Daily Commuter",
    description: "Stay ahead of your daily commute", icon: Car,
    score: "82", scoreLabel: "COMMUTE CONDITIONS",
    insightTitle: "Morning commute looks clear.",
    insightText: "Visibility is good and no major weather disruptions are expected during the morning commute.",
    recommendation: "Clear conditions expected during the morning commute.",
    metrics: [
      { label: "Commute Comfort", value: "82 / 100", icon: Car },
      { label: "Rain Probability", value: "20%", icon: CloudRain },
      { label: "Visibility", value: "8 km", icon: Eye },
      { label: "Wind", value: "18 km/h", icon: Wind }
    ],
    theme: { accent: "from-orange-500 to-amber-600", soft: "bg-orange-50", text: "text-orange-700" }
  }
};

export const cities = {
  Bengaluru: { name: "Bengaluru", state: "Karnataka, India", temperature: "31°", feelsLike: "34°C", condition: "Sunny", icon: "☀️" },
  Mumbai: { name: "Mumbai", state: "Maharashtra, India", temperature: "29°", feelsLike: "32°C", condition: "Partly Cloudy", icon: "⛅" },
  Delhi: { name: "Delhi", state: "Delhi, India", temperature: "34°", feelsLike: "37°C", condition: "Clear", icon: "☀️" },
  Guwahati: { name: "Guwahati", state: "Assam, India", temperature: "28°", feelsLike: "31°C", condition: "Cloudy", icon: "☁️" }
};