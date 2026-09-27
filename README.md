# MAUSAM – Multilingual Live Weather

## Run locally

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173/`.

## Production build

```bash
npm run build
npm run preview
```

## Important

- The app uses Open-Meteo for live weather and does not require an API key.
- Select a profile, select a city, and then view the live dashboard.
- The language selector is available throughout the flow.
- UI text, weather descriptions, profile labels, metrics, recommendations, loading/error states and other visible application text are driven by the translation dictionaries.
- Urdu switches the document to RTL layout.

## If the browser shows a blank page

Open the browser developer console (`F12` → Console) and check for a red error. The dashboard resolves the selected profile ID to its profile object before rendering, which prevents the profile/theme runtime error that can otherwise produce a blank dashboard.
