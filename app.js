const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const geoBtn = document.getElementById('geoBtn');
const result = document.getElementById('result');
const placeEl = document.getElementById('place');
const descriptionEl = document.getElementById('description');
const tempEl = document.getElementById('temp');
const feelsEl = document.getElementById('feels');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const iconEl = document.getElementById('icon');
const errorEl = document.getElementById('error');

const API_KEY = '27c8e4504e8a702231bb2e7482835d52'; // 🔴 PUT YOUR KEY HERE
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/* ================================
   UI HELPERS
================================ */
function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
  result.classList.add('hidden');
}

function showWeather(data) {
  errorEl.classList.add('hidden');
  result.classList.remove('hidden');

  placeEl.textContent = `${data.name}, ${data.sys.country}`;
  descriptionEl.textContent = data.weather[0].description;
  tempEl.textContent = Math.round(data.main.temp);
  feelsEl.textContent = Math.round(data.main.feels_like);
  humidityEl.textContent = data.main.humidity;
  windEl.textContent = data.wind.speed;

  const icon = data.weather[0].icon;
  iconEl.innerHTML = `
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
         alt="${data.weather[0].description}">
  `;
}

/* ================================
   FETCH WEATHER
================================ */
async function fetchWeather(params) {
  const qs = new URLSearchParams({
    ...params,
    units: 'metric',
    appid: API_KEY,
  });

  try {
    const resp = await fetch(`${BASE_URL}?${qs}`);
    if (!resp.ok) throw new Error('City not found');
    const data = await resp.json();
    showWeather(data);
  } catch (err) {
    showError(err.message);
  }
}

/* ================================
   EVENTS
================================ */
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return showError('Enter a city name');
  fetchWeather({ q: city });
});

geoBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      fetchWeather({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    },
    () => showError('Location access denied')
  );
});
