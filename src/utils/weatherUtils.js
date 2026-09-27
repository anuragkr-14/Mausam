const WEATHER_DESCRIPTION_KEYS = {
  0: "clearSky",
  1: "mainlyClear",
  2: "partlyCloudy",
  3: "overcast",
  45: "foggy",
  48: "foggy",
  51: "lightDrizzle",
  53: "drizzle",
  55: "heavyDrizzle",
  61: "lightRain",
  63: "moderateRain",
  65: "heavyRain",
  71: "lightSnow",
  73: "moderateSnow",
  75: "heavySnow",
  80: "lightRainShowers",
  81: "rainShowers",
  82: "heavyRainShowers",
  95: "thunderstorm",
  96: "thunderstormLightHail",
  99: "thunderstormHeavyHail",
};

export function getWeatherDescriptionKey(code) {
  return WEATHER_DESCRIPTION_KEYS[code] || "overcast";
}

export function getWeatherDescription(code) {
  return getWeatherDescriptionKey(code);
}

export function getWeatherEmoji(code, isDay = 1) {
  if (!isDay) {
    if ([95, 96, 99].includes(code)) return "⛈️";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
    if ([45, 48].includes(code)) return "🌫️";
    return "🌙";
  }

  if (code === 0) return "☀️";
  if ([1, 2].includes(code)) return "🌤️";
  if (code === 3) return "☁️";
  if ([45, 48].includes(code)) return "🌫️";
  if ([51, 53, 55].includes(code)) return "🌦️";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "🌧️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "☁️";
}

export function normalizeWeather(data) {
  if (!data?.current) {
    throw new Error("Current weather data is unavailable.");
  }

  const current = data.current;
  const hourly = data.hourly || {};
  const hourlyTimes = Array.isArray(hourly.time) ? hourly.time : [];
  const currentIndex = hourlyTimes.findIndex((time) => time === current.time);

  const precipitationProbability =
    currentIndex >= 0
      ? hourly.precipitation_probability?.[currentIndex] ?? 0
      : 0;

  const visibility =
    current.visibility !== null && current.visibility !== undefined
      ? Math.round(current.visibility / 1000)
      : null;

  return {
    temperature:
      current.temperature_2m !== null && current.temperature_2m !== undefined
        ? Math.round(current.temperature_2m)
        : null,
    feelsLike:
      current.apparent_temperature !== null && current.apparent_temperature !== undefined
        ? Math.round(current.apparent_temperature)
        : null,
    humidity:
      current.relative_humidity_2m !== null && current.relative_humidity_2m !== undefined
        ? Math.round(current.relative_humidity_2m)
        : null,
    precipitation: current.precipitation ?? 0,
    precipitationProbability,
    weatherCode: current.weather_code,
    weatherDescriptionKey: getWeatherDescriptionKey(current.weather_code),
    emoji: getWeatherEmoji(current.weather_code, current.is_day),
    windSpeed:
      current.wind_speed_10m !== null && current.wind_speed_10m !== undefined
        ? Math.round(current.wind_speed_10m)
        : null,
    visibility,
    uvIndex:
      current.uv_index !== null && current.uv_index !== undefined
        ? Math.round(current.uv_index)
        : 0,
    isDay: current.is_day,
    sunrise: data.daily?.sunrise?.[0] ?? null,
    sunset: data.daily?.sunset?.[0] ?? null,
    timezone: data.timezone ?? null,
  };
}
