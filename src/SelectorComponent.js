import React from 'react';
import cities from './capitalCities.json';

export default function SelectorComponent(props) {
  return (
    <select
      className="border-2 border-black"
      name="selector"
      id="selector"
      onChange={(event) => {
        const newCity = event.currentTarget.value;
        props.setCity(newCity);
      }}
    >
      <option key="city-empty" value="">
        Select country
      </option>
      {/* ISSUE: Whenever city is empty e.g. in microstates, it throws an error! */}
      {cities.map((item) => (
        <option key={`city-${item.city}`} value={item.city}>
          {item.country}
        </option>
      ))}
    </select>
  );
}
