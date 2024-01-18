import './App.css';
import { useEffect, useState } from 'react';
import SelectorComponent from './SelectorComponent';

export default function App() {
  // Const for API secret.
  const API_KEY = process.env.REACT_APP_openWeatherAPIKey;
  // Define states for required weather data points.
  const [weatherDescription, setWeatherDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [city, setCity] = useState('Wien');
  const [country, setCountry] = useState('');
  // Fetch weather data.
  // PROBLEM - useEffect is not being called on state change! Hence, I change the city but nothing happens!
  useEffect(() => {
    const weatherData = async () => {
      const fetchWeatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`,
      );
      const weatherDataJson = await fetchWeatherData.json();
      const weather = await weatherDataJson;
      setWeatherDescription(weather.weather[0].description);
      setLocationName(weather.name);
    };
    weatherData();
    return () => {};
  }, [city]); // Dependency is set to city, so every time city changes, useEffect() will run!
  // End of fetch weather data.
  return (
    <>
      <p>{`Status: ${weatherDescription}`}</p>
      <p>{`Location: ${locationName}`}</p>
      <SelectorComponent setCity={setCity} />
    </>
  );
}
