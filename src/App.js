import { useEffect, useState } from 'react';
import styles from './App.module.scss';

export default function App() {
  // Define states for LatLong used for weather data API fetching.
  const [selectedLat, setSelectedLat] = useState(48.2083537);
  const [selectedLong, setSelectedLong] = useState(16.3725042);
  // Define states for weather data returned from weather API.
  const [temperature, setTemperature] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');
  const [cityName, setCityName] = useState('');
  const [countryName, setCountryName] = useState('');
  // Define states for city list and geolocation API.
  const [inputCity, setInputCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [resultCities, setResultCities] = useState([]);
  // Define current date variables to show current day e.g. "Monday" in the UI.
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
  // Start of async functions
  // useEffect to fetch weather data using LatLong (taken from city list).
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
  // useEffect to fetch city list based on user input.
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
  // Start of user interface.
  return (
    <div className={styles.mainWrapper}>
      <h1>Weather widget</h1>
      {/* Start of the weather display. */}
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
      {/* Start of the city selector. */}
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
        {/* Start of the city name result list incl. conditional rendering. */}
        <div>
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
        {/* End of the result list. */}
      </div>
      {/* End of the city selector. */}
    </div>
  );
}
