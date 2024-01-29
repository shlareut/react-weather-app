import { useEffect, useState } from 'react';
import styles from './App.module.scss';

export default function App() {
  // Vars
  const [selectedLat, setSelectedLat] = useState(48.2083537);
  const [selectedLong, setSelectedLong] = useState(16.3725042);
  // Weather data
  const [temperature, setTemperature] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  // City dropdown data
  const [inputCity, setInputCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [resultCities, setResultCities] = useState([]);
  // Various variables
  const currentDate = new Date();
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  // API functions
  // useEffect to fetch weather data.
  useEffect(() => {
    const getWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLat}&lon=${selectedLong}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
      );
      const result = await response.json();
      setTemperature(result.main.temp);
      setWeatherDescription(result.weather[0].description);
      setWeatherIcon(result.weather[0].icon);
      setCityName(result.name);
      setCountryName(result.sys.country);
    };

    getWeather().catch((error) => {
      console.log(error);
    });
  }, [selectedLat, selectedLong]);
  // useEffect to fetch city dropdown.
  useEffect(() => {
    const getCities = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=10&appid=${process.env.REACT_APP_API_KEY}`,
      );
      const result = await response.json();
      const newResultCities = [];
      newResultCities.push(result);
      setResultCities(result);
    };

    getCities().catch((error) => {
      console.log(error);
    });
  }, [searchCity]);
  return (
    <div className={styles.mainWrapper}>
      <h1>Weather widget</h1>
      <div className={styles.weatherDisplayWrapper}>
        <div className={styles.weatherContentWrapper}>
          <img
            alt="weather-icon"
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          />
          <div className={styles.temp}>{Math.round(temperature)}°C</div>
          <div className={styles.weatherTextWrapper}>
            <div className={styles.weatherDesc}>{weatherDescription}</div>
            <div className={styles.remainingWeatherInfo}>
              {dayOfWeek} - {cityName}, {countryName}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.citySelectorWrapper}>
        <div className={styles.inputWrapper}>
          <input
            name="cityName"
            placeholder="Enter a city name"
            value={inputCity}
            onChange={(event) => {
              setInputCity(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setSearchCity(inputCity);
                setInputCity('');
              }
            }}
          />
          <button
            onClick={() => {
              setSearchCity(inputCity);
              setInputCity('');
            }}
          >
            Search now
          </button>
        </div>
        <div className={styles.resultWrapper}>
          {!searchCity ? (
            <p>Please enter a city name.</p>
          ) : !resultCities[0] ? (
            <p>No results. Please search for a different city name.</p>
          ) : (
            <>
              <p>Select a city from the list below.</p>
              <ul>
                {resultCities.map((city) => (
                  <li key={`ID-${city.name}${city.state}${city.country}`}>
                    <label>
                      <input
                        type="radio"
                        checked={
                          selectedLat === city.lat && selectedLong === city.lon
                        }
                        onChange={() => {
                          setSelectedLat(city.lat);
                          setSelectedLong(city.lon);
                        }}
                      />
                      {city.name}
                      {city.state ? `, ${city.state}` : ''}, {city.country}
                    </label>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
