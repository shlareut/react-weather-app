import React, { useEffect } from 'react';

export default function WeatherDisplayComponent(props) {
  useEffect(() => {
    const weatherData = async () => {
      const fetchWeatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${process.env.REACT_APP_openWeatherAPIKey}`,
      );
      const weatherDataJson = await fetchWeatherData.json();
      const weatherDescription = await weatherDataJson.weather[0];
      props.setWeatherDescription(weatherDescription.description);
    };
    weatherData();
    return () => {};
  }, []);
  return <></>;
}
