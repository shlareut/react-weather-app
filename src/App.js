import './App.css';
import { useEffect, useState } from 'react';
import logo from './logo.svg';
import WeatherDisplayComponent from './WeatherDisplayComponent';

export default function App() {
  const initialWeatherDescription = '';
  const [weatherDescription, setWeatherDescription] = useState(
    initialWeatherDescription,
  );
  return (
    <>
      <div>Hallo</div>
      <p>Test</p>
      <WeatherDisplayComponent
        weatherDescription={weatherDescription}
        setWeatherDescription={setWeatherDescription}
      />
      {/* <p>{weather.weather[0]}</p> */}
      <p>{weatherDescription}</p>
    </>
  );
}
