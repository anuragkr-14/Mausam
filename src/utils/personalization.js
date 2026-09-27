export function getPersonalizedData(profileId, weather) {
  if (!weather) {
    return {
      titleKey: "weatherUnavailableTitle",
      descriptionKey: "tryAgainShortly",
      recommendationKey: "refreshWeather",
      severity: "neutral",
      type: "unavailable",
    };
  }

  const rainProbability = weather.precipitationProbability ?? 0;
  const uvIndex = weather.uvIndex ?? 0;
  const temperature = weather.temperature ?? 0;
  const humidity = weather.humidity ?? 0;
  const windSpeed = weather.windSpeed ?? 0;
  const visibility = weather.visibility;

  let severity = "good";
  let type = "comfortable";

  if (rainProbability >= 60) {
    severity = "warning";
    type = "rain";
  } else if (windSpeed >= 35) {
    severity = "warning";
    type = "wind";
  } else if (uvIndex >= 8) {
    severity = "warning";
    type = "uv";
  } else if (temperature >= 35) {
    severity = "warning";
    type = "heat";
  } else if (humidity >= 80) {
    severity = "warning";
    type = "humidity";
  } else if (
    visibility !== null &&
    visibility !== undefined &&
    visibility < 3
  ) {
    severity = "warning";
    type = "visibility";
  }

  const titleKey =
    severity === "warning" ? "conditionsNeedAttention" : "conditionsGood";

  const recommendationKey = {
    fitness: "fitnessAdvice",
    health: "healthAdvice",
    traveler: "travelerAdvice",
    commuter: "commuterAdvice",
  }[profileId] || "generalAdvice";

  return {
    titleKey,
    descriptionKey: "currentConditionsDescription",
    recommendationKey,
    severity,
    type,
  };
}
