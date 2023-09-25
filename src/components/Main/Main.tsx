import * as React from "react";
import Header from "../Header/header";
import YandexMapApi from "./YandexMapApi/YandexMapApi";
import OpenWeatherApi from "./openwather-now/openweather";
import FiveDaysApi from "./openweather-5days/openweather-5";
import SelectCity from "./SelectCity/SelectCity";
import Banner from "./Banner/Banner";
import "./main.scss";

function Main() {
  const [City, setSelectedCity] = React.useState("Москва");
  const setCity = (city: string) => {
    setSelectedCity(city);
  };

  const [coordinates, setCoordinates] = React.useState("");
  const a = React.useRef("");

  if (a.current != City) {
    YandexMapApi(City).then((result) => {
      setCoordinates(result);
    });
    a.current = City;
  }

  return (
    <>
      <Header />
      <div className='main'>
        <SelectCity setCity={setCity} />
        <hr />
        <div className='widgets'>
          <OpenWeatherApi>{coordinates}</OpenWeatherApi>
          <Banner />
        </div>
        <FiveDaysApi>{coordinates}</FiveDaysApi>
      </div>
      <div className='footer'></div>
    </>
  );
}
export default Main;
