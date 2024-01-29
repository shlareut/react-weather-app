import './App.css';
import { useEffect, useState } from 'react';

export default function App() {
  // Const for API secret.
  const API_KEY = process.env.REACT_APP_openWeatherAPIKey;
  // Define variables
  const [inputCity, setInputCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  // Define URL variables
  const directGeocode = `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=10&appid=${API_KEY}`;
  return (
    <>
      <div>
        <label>
          Enter a city:
          <input
            name="cityName"
            value={inputCity}
            onChange={(event) => {
              setInputCity(event.currentTarget.value);
            }}
          />
        </label>
      </div>
      <div>
        <button
          onClick={() => {
            setSearchCity(inputCity);
          }}
        >
          Search city
        </button>
      </div>
      <div>{searchCity}</div>
    </>
  );
}
