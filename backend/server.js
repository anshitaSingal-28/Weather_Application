require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).send('City name is required');
  }

  try {
    const apiKey = process.env.API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log('Fetching weather data for city:', city);  // Log city

    const response = await axios.get(weatherUrl);
    console.log('API Response:', response.data);  
    console.log()
    
    const weatherData = {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      country: response.data.sys.country,
    };

    return res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return res.status(500).send('Failed to fetch weather data');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});




