const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ OPENWEATHERMAP_API_KEY not set in .env');
}

app.get('/api/weather', async (req, res) => {
  const { q, lat, lon } = req.query;

  if (!API_KEY) {
    return res.status(500).json({ error: 'Server missing API key' });
  }

  try {
    let url;

    if (q) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        q
      )}&units=metric&appid=${API_KEY}`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    } else {
      return res.status(400).json({ error: 'City or coordinates required' });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: err.response?.data?.message || 'Weather fetch failed',
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Atmosphere running at http://localhost:${PORT}`)
);
