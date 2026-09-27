const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeather(latitude, longitude) {
  if (
    latitude === undefined ||
    latitude === null ||
    longitude === undefined ||
    longitude === null
  ) {
    throw new Error("Latitude and longitude are required.");
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "visibility",
      "uv_index",
      "is_day",
    ].join(","),

    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation_probability",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
      "uv_index",
      "visibility",
    ].join(","),

    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "weather_code",
      "sunrise",
      "sunset",
    ].join(","),

    timezone: "auto",
    forecast_days: "7",
  });

  const response = await fetch(
    `${BASE_URL}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `Open-Meteo request failed: ${response.status}`
    );
  }

  const data = await response.json();

  if (!data.current) {
    throw new Error("Invalid weather data received.");
  }

  return data;
}