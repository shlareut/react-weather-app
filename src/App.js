import './App.module.scss';
import { useEffect, useState } from 'react';

export default function App() {
  // Const for API secret.
  const API_KEY = process.env.REACT_APP_openWeatherAPIKey;
  // const API_KEY = 'a723aea928c83bf876a416d79bf6ece4';
  // Define city variables
  const [inputCity, setInputCity] = useState('');
  const [searchCity, setSearchCity] = useState('Vienna');
  const [resultCities, setResultCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Vienna');
  const [selectedCityState, setSelectedCityState] = useState('');
  const [selectedCityCountry, setSelectedCityCountry] = useState('AT');
  const [selectedLat, setSelectedLat] = useState(48.2083537);
  const [selectedLong, setSelectedLong] = useState(16.3725042);
  // Define weather variables
  const [temperature, setTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');
  const [minTemperature, setMinTemperature] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('01d');
  const [locationName, setLocationName] = useState('');
  // Define URL variables
  const geocodeAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=10&appid=${API_KEY}`;
  const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${selectedLat}&lon=${selectedLong}&units=metric&appid=${API_KEY}`;
  // Fetch weather data.
  useEffect(() => {
    const getWeather = async () => {
      const response = await fetch(weatherAPI);
      const result = await response.json();
      setTemperature(result.main.temp);
      setMaxTemperature(result.main.temp_max);
      setMinTemperature(result.main.temp_min);
      setWeatherDescription(result.weather[0].description);
      setWeatherIcon(result.weather[0].icon);
      setLocationName(result.name);
    };

    getWeather().catch((error) => {
      console.log(error);
    });
  }, [selectedLat]);
  // Fetch city search results.
  useEffect(() => {
    const getCities = async () => {
      setResultCities([]);
      const response = await fetch(geocodeAPI);
      const result = await response.json();
      setResultCities(result);
    };

    getCities().catch((error) => {
      console.log(error);
    });
    console.log(resultCities);
  }, [searchCity]);
  return (
    <>
      <div>Weather widget</div>
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
      <div>Results</div>
      <div>
        {!resultCities[0] ? (
          <p>No results. Please search for a different city name.</p>
        ) : (
          <ul>
            {resultCities.map((city) => (
              <li key={`ID-${city.name}${city.state}${city.country}`}>
                <label>
                  <input
                    type="radio"
                    checked={
                      selectedLat === city.lat && selectedLong === city.lon
                    }
                    onClick={() => {
                      setSelectedCity(city.name);
                      setSelectedCityState(city.state);
                      setSelectedCityCountry(city.country);
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
        )}
      </div>
      <div>
        {selectedCity}
        {selectedCityState ? `, ${selectedCityState}` : ''},{' '}
        {selectedCityCountry}
      </div>
      <ul>
        <li>{temperature}</li>
        <li>{maxTemperature}</li>
        <li>{minTemperature}</li>
        <li>{weatherDescription}</li>
        <li>
          {' '}
          <img
            alt="weather-icon"
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          />
        </li>
        <li>{locationName}</li>
      </ul>
    </>
  );
}
