import React, { useEffect, useState } from "react";

const Weather = () => {
  const [location, setLocation] = useState(""); // Default location
  const [weather, setWeather] = useState(null);

  const fetchWeather = async (location) => {
    const BASE_URL = `https://yahoo-weather5.p.rapidapi.com/weather?location=${location}&format=json&u=f`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '21e750f478msh29972d9548ab556p1bfd15jsn3e4239571fa3',
        'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(BASE_URL, options);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const result = await response.json();
      console.log(result); // Log the result to inspect the data

      setWeather(result); // Set the entire result to state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather(location); // Fetch weather data on component mount with default location
  }, []);

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    fetchWeather(location); // Fetch weather data based on user input
  };

  return (
    <div className="weather-gradient h-auto w-full flex flex-col items-center justify-center py-10">
      {/* Input Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="p-2 border border-white bg-transparent text-white"
        />
        <button type="submit" className="p-2 ml-2 bg-blue-500 text-white border border-white">
          Search
        </button>
      </form>

      {/* Weather Data */}
      {weather ? (
        <div className="text-white">
          <div className="mb-4 border border-white p-4">
            <h2 className="text-2xl font-bold">Current Weather in {weather.location.city}, {weather.location.country}</h2>
            <p><strong>Temperature:</strong> {weather.current_observation.condition.temperature}°F</p>
            <p><strong>Condition:</strong> {weather.current_observation.condition.text}</p>
            <p><strong>Wind:</strong> {weather.current_observation.wind.speed} mph {weather.current_observation.wind.direction}</p>
            <p><strong>Humidity:</strong> {weather.current_observation.atmosphere.humidity}%</p>
            <p><strong>Visibility:</strong> {weather.current_observation.atmosphere.visibility} miles</p>
            <p><strong>Sunrise:</strong> {weather.current_observation.astronomy.sunrise}</p>
            <p><strong>Sunset:</strong> {weather.current_observation.astronomy.sunset}</p>
          </div>

          <div className="border border-white p-4">
            <h3 className="text-xl font-bold mb-2">7-Day Forecast</h3>
            <ul>
              {weather.forecasts.slice(0, 7).map((forecast, index) => (
                <li key={index} className="mb-2">
                  <p><strong>{forecast.day}:</strong> High: {forecast.high}°F, Low: {forecast.low}°F - {forecast.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-white">Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
