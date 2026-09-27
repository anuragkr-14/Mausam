import {
  Activity,
  HeartPulse,
  Plane,
  Car,
  Wind,
  Sun,
  CloudRain,
  Sunrise,
  Droplets,
  Leaf,
  Eye,
  ShieldCheck,
} from "lucide-react";

export const profiles = {
  fitness: {
    id: "fitness",

    name: "Fitness",
    nameKey: "fitness",

    fullName: "Outdoor Fitness",
    fullNameKey: "outdoorFitness",

    description: "Plan your outdoor workouts",
    descriptionKey: "fitnessDescription",

    icon: Activity,

    score: "72",
    scoreLabel: "FITNESS SCORE",
    scoreLabelKey: "fitnessScore",

    insightTitle:
      "Good conditions for outdoor activity.",

    insightText:
      "Cooler temperatures and lower UV can make early morning a comfortable window for outdoor activity.",

    recommendation:
      "Consider exercising during the cooler part of the day and use sun protection when UV levels are high.",

    metrics: [
      {
        label: "Best Running Time",
        labelKey: "bestRunningTime",
        value: "06:00 – 07:30",
        icon: Activity,
      },
      {
        label: "UV Index",
        labelKey: "uvIndex",
        value: "8",
        valueSuffixKey: "high",
        icon: Sun,
      },
      {
        label: "Wind",
        labelKey: "wind",
        value: "18",
        valueUnitKey: "kmh",
        icon: Wind,
      },
      {
        label: "Rain",
        labelKey: "rain",
        value: "10",
        valueUnitKey: "percent",
        icon: CloudRain,
      },
      {
        label: "Sunrise",
        labelKey: "sunrise",
        value: "05:58",
        icon: Sunrise,
      },
    ],

    theme: {
      accent: "from-sky-500 to-blue-600",
      soft: "bg-sky-50",
      text: "text-sky-700",
    },
  },

  health: {
    id: "health",

    name: "Health",
    nameKey: "health",

    fullName: "Health Conscious",
    fullNameKey: "healthConscious",

    description:
      "Monitor air quality and health conditions",
    descriptionKey: "healthDescription",

    icon: HeartPulse,

    score: "82",
    scoreLabel: "AIR QUALITY",
    scoreLabelKey: "airQuality",

    insightTitle:
      "Air quality is moderate today.",

    insightText:
      "Current weather conditions can help you decide when outdoor exposure is more comfortable.",

    recommendation:
      "Monitor UV and humidity levels and take breaks during prolonged outdoor activity.",

    metrics: [
      {
        label: "AQI",
        labelKey: "aqi",
        value: "82",
        valueSuffixKey: "moderate",
        icon: Wind,
      },
      {
        label: "Pollen",
        labelKey: "pollen",
        valueKey: "moderate",
        value: "Moderate",
        icon: Leaf,
      },
      {
        label: "UV Index",
        labelKey: "uvIndex",
        value: "8",
        valueSuffixKey: "high",
        icon: Sun,
      },
      {
        label: "Humidity",
        labelKey: "humidity",
        value: "68",
        valueUnitKey: "percent",
        icon: Droplets,
      },
    ],

    theme: {
      accent: "from-emerald-500 to-teal-600",
      soft: "bg-emerald-50",
      text: "text-emerald-700",
    },
  },

  traveler: {
    id: "traveler",

    name: "Traveler",
    nameKey: "traveler",

    fullName: "Smart Traveler",
    fullNameKey: "smartTraveler",

    description:
      "Make every journey weather-ready",
    descriptionKey: "travelerDescription",

    icon: Plane,

    score: "78",
    scoreLabel: "TRAVEL COMFORT",
    scoreLabelKey: "travelComfortScore",

    insightTitle:
      "Comfortable weather for your journey.",

    insightText:
      "Check rain probability, wind and visibility before starting your journey.",

    recommendation:
      "Carry essentials appropriate for the current weather and check conditions again before travelling.",

    metrics: [
      {
        label: "Destination Weather",
        labelKey: "destinationWeather",
        value: "31",
        valueUnitKey: "celsius",
        valueSuffixKey: "sunny",
        icon: Sun,
      },
      {
        label: "Rain Probability",
        labelKey: "rainProbability",
        value: "10",
        valueUnitKey: "percent",
        icon: CloudRain,
      },
      {
        label: "Severe Weather",
        labelKey: "severeWeather",
        valueKey: "none",
        value: "None",
        icon: ShieldCheck,
      },
      {
        label: "Travel Comfort",
        labelKey: "travelComfort",
        valueKey: "good",
        value: "Good",
        icon: Plane,
      },
    ],

    theme: {
      accent: "from-violet-500 to-indigo-600",
      soft: "bg-violet-50",
      text: "text-violet-700",
    },
  },

  commuter: {
    id: "commuter",

    name: "Commuter",
    nameKey: "commuter",

    fullName: "Daily Commuter",
    fullNameKey: "dailyCommuter",

    description:
      "Stay ahead of your daily commute",
    descriptionKey: "commuterDescription",

    icon: Car,

    score: "82",
    scoreLabel: "COMMUTE CONDITIONS",
    scoreLabelKey: "commuteConditions",

    insightTitle:
      "Morning commute looks clear.",

    insightText:
      "Visibility, rain probability and wind can help you prepare for your daily commute.",

    recommendation:
      "Check live conditions before leaving and allow extra travel time when rain or reduced visibility is expected.",

    metrics: [
      {
        label: "Commute Comfort",
        labelKey: "commuteComfort",
        value: "82 / 100",
        icon: Car,
      },
      {
        label: "Rain Probability",
        labelKey: "rainProbability",
        value: "20",
        valueUnitKey: "percent",
        icon: CloudRain,
      },
      {
        label: "Visibility",
        labelKey: "visibility",
        value: "8",
        valueUnitKey: "kmUnit",
        icon: Eye,
      },
      {
        label: "Wind",
        labelKey: "wind",
        value: "18",
        valueUnitKey: "kmh",
        icon: Wind,
      },
    ],

    theme: {
      accent: "from-orange-500 to-amber-600",
      soft: "bg-orange-50",
      text: "text-orange-700",
    },
  },
};

export const cities = {
  Bengaluru: {
    name: "Bengaluru",
    latitude: 12.9716,
    longitude: 77.5946,
    state: "Karnataka",
    country: "India",
    icon: "🌤️",
  },

  Mumbai: {
    name: "Mumbai",
    latitude: 19.076,
    longitude: 72.8777,
    state: "Maharashtra",
    country: "India",
    icon: "🌦️",
  },

  Delhi: {
    name: "Delhi",
    latitude: 28.6139,
    longitude: 77.209,
    state: "Delhi",
    country: "India",
    icon: "☀️",
  },

  Guwahati: {
    name: "Guwahati",
    latitude: 26.1445,
    longitude: 91.7362,
    state: "Assam",
    country: "India",
    icon: "🌧️",
  },
};