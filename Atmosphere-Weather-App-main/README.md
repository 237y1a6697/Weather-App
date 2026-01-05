# Atmosphere — Weather App

A simple weather app using Node.js (Express) for a small backend proxy and a static frontend (HTML/CSS/JS). It fetches current weather from OpenWeatherMap.

## Features
- Search by city name
- Use browser geolocation to get weather for current location
- Server-side proxy to keep API key secret

## Requirements
- Node.js 16+
- OpenWeatherMap API key (https://openweathermap.org/api)

## Setup (local)
1. Clone the repo.
2. Create a `.env` file in the project root:
   ```
   OPENWEATHERMAP_API_KEY=your_api_key_here
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start in development:
   ```
   npm run dev
   ```
   or production:
   ```
   npm start
   ```
5. Open http://localhost:3000

## Deploy
- You can deploy to platforms like Render, Heroku, Vercel (using serverless functions), Railway etc.
- Ensure you set the `OPENWEATHERMAP_API_KEY` environment variable in the hosting platform settings.

## Notes
- The project uses OpenWeatherMap current weather endpoint and returns metric units (°C).
- To extend: add forecast, caching, nicer UI, icons, unit toggle (C/F), or location search suggestions.
