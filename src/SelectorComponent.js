import React from 'react';
import cities from './capitalCities.json';

export default function SelectorComponent(props) {
  return (
    <div className="flex justify-between">
      <label for="selector">Country: </label>
      <select
        className="border-2 w-3/5"
        name="selector"
        id="selector"
        onChange={(event) => {
          const newCity = event.currentTarget.value;
          props.setCity(newCity);
        }}
      >
        {/* ISSUE: Whenever city is empty e.g. in microstates, it throws an error! */}
        {/* Next step: Generate list from same weather API instead of static json. */}
        {cities.map((item) => (
          <option key={`city-${item.city}`} value={item.city}>
            {/* Set city based on country - needs to change! */}
            {item.country}
          </option>
        ))}
      </select>
    </div>
  );
}
