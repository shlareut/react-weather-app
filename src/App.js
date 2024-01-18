import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  // Const for API secret.
  const APIkey = process.env.REACT_APP_openWeatherAPIKey;
  // Define states for required weather data points.
  const [weatherDescription, setWeatherDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  // Fetch weather data.
  useEffect(() => {
    const weatherData = async () => {
      const fetchWeatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${APIkey}`,
      );
      const weatherDataJson = await fetchWeatherData.json();
      const weather = await weatherDataJson;
      setWeatherDescription(weather.weather[0].description);
      setLocationName(weather.name);
    };
    weatherData();
    return () => {};
  }, []);
  // End of fetch weather data.
  return (
    <>
      <p>{`Status: ${weatherDescription}`}</p>
      <p>{`Location: ${locationName}`}</p>
    </>
  );
}
