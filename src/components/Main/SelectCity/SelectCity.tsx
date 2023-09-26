import * as React from "react";
import city_list from "./city_list";
import "./SelectCity.scss";

export default function SelectCity({ setCity }) {
  const options = city_list.map((value) => {
    return (
      <option value={value} key={value}>
        {value}
      </option>
    );
  });

  return (
    <>
      <div className='selector'>
        <label>
          Выберите город:
          <select
            onChange={(e) => setCity(e.target.value)}
            className='select-city'
            name='selectCity'
          >
            {options}
          </select>
        </label>
      </div>
    </>
  );
}
