import './App.css';
import { useEffect, useState } from 'react';
import SelectorComponent from './SelectorComponent';

export default function App() {
  // Const for API secret.
  const API_KEY = process.env.REACT_APP_openWeatherAPIKey;
  // Define states for required weather data points.
  const [temperature, setTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');
  const [minTemperature, setMinTemperature] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('01d');
  const [locationName, setLocationName] = useState('');
  // City will break if empty! Set to Kabul as Afghanistan is first country in selector!
  const [city, setCity] = useState('Kabul');
  const [country, setCountry] = useState('');
  // Fetch weather data.
  // PROBLEM - useEffect is not being called on state change! Hence, I change the city but nothing happens!
  useEffect(() => {
    const weatherData = async () => {
      const fetchWeatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${API_KEY}`,
      );
      const weatherDataJson = await fetchWeatherData.json();
      const weather = await weatherDataJson;
      setTemperature(weather.main.temp);
      setMaxTemperature(weather.main.temp_max);
      setMinTemperature(weather.main.temp_min);
      setWeatherDescription(weather.weather[0].description);
      setWeatherIcon(weather.weather[0].icon);
      setLocationName(weather.name);
    };
    weatherData();
    return () => {};
  }, [city]); // LEARNING: Dependency is set to city, so every time city changes, useEffect() will run!
  // End of fetch weather data.
  return (
    <div className="flex justify-center w-full">
      <div className="w-1/5">
        <div className="pl-5 border-2 py-5 my-5">
          <p>{`Capital: ${locationName}`}</p>
          <p>{`Temperature: ${Math.floor(temperature)}°C`}</p>
          <p>{`Max: ${Math.floor(maxTemperature)}°C`}</p>
          <p>{`Min: ${Math.floor(minTemperature)}°C`}</p>
          <p>{`Weather: ${weatherDescription}`}</p>
          <p>
            <img
              alt="weather-icon"
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            />
          </p>
        </div>
        <SelectorComponent setCity={setCity} />
      </div>
    </div>
  );
}
