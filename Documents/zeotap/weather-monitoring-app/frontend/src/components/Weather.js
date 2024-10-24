import React, { useState } from 'react';
import './Weather.css'; // Make sure this is the correct path to your Weather CSS file

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);

    const getWeatherData = () => {
        // Fetch weather data logic
    };

    return (
        <div className="container">
            <h1>Weather Forecast</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={getWeatherData}>Get Weather</button>

            {weatherData && (
                <div className="card">
                    <h2>Current Weather</h2>
                    <p>Temperature: {weatherData.temp}°C</p>
                    <p>Condition: {weatherData.condition}</p>
                </div>
            )}

            <div className="forecast">
                {forecastData.map((day) => (
                    <div className="forecast-day" key={day.date}>
                        <h3>{day.date}</h3>
                        <p>Temperature: {day.temp}°C</p>
                        <p>Condition: {day.condition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Weather;
