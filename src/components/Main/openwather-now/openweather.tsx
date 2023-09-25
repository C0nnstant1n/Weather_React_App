import * as React from "react";
import axios from "axios";
import { openweather_key } from "../../../../secrets";
import "./openweather.scss";

// В тех задании указывается использовать One Call API OpenWeather,
// но так как для регистрации нужно указывать платёжные данные,
// что невозможно из России, используются бесплатный ключ OpenWeather

interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const weatherData: WeatherData = {
  coord: {
    lon: 37.6191,
    lat: 55.7592,
  },
  weather: [
    {
      id: 0,
      main: "",
      description: "",
      icon: "",
    },
  ],
  base: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
    gust: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: "RU",
    sunrise: 0,
    sunset: 0,
  },
  timezone: 10800,
  id: 0,
  name: "Загрузка",
  cod: 0,
};

interface ChildrenData {
  children: string;
}

export default function OpenWeatherApi(props: ChildrenData) {
  const [weather, setWeather] = React.useState(weatherData);

  let lat: string = "0";
  let lon: string = "0";
  const status = React.useRef("");

  if (status.current != props.children) {
    const coordinates = props.children;
    const c = coordinates.split(" ");
    lat = c[1];
    lon = c[0];
    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openweather_key}&units=metric&lang=ru`;

    if (props.children) {
      axios.get(weather_url).then((request) => {
        setWeather(request.data);
      });
    }
    status.current = props.children;
  }

  return (
    <>
      {
        <div className='temp-widget'>
          <div className='widget-filter'>
            <div className='temp-widget__header'>
              <h2>Погода в: {weather.name}</h2>
            </div>
            <div className='temp-widget__temp-wrap'>
              <span className='main-temp'>{Math.round(weather.main.temp)}</span>
              <img
                src={require("./icons/celsius.svg")}
                alt='temp-prop-icon'
              ></img>
              <img
                src={require("./icons/sunny_weather.svg")}
                alt='icon_temp'
              ></img>
              <div className='description'>
                <div className='description__description'>
                  {weather.weather[0].description}
                  <div className='label'>
                    <div className='description__label'>Ощущается как</div>
                    <span className='description__feels'>
                      {Math.round(weather.main.feels_like)} <sup>o</sup>С
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='props-wrapper'>
              <div className='wind-prop'>
                <img src={require("./icons/wind-weather.svg")} alt='wind'></img>
                <div className='wind'>{weather.wind.speed} м/с</div>
                <img
                  src={require("./icons/direction_left.svg")}
                  alt='icon_wind_direction'
                ></img>
              </div>
              <div className='humidity-prop'>
                <img
                  src={require("./icons/humidity.svg")}
                  alt='icon_humidity'
                ></img>
                <div className='humidity'>{weather.main.humidity} %</div>
              </div>
              <div className='pressure-prop'>
                <img
                  src={require("./icons/pressure_air.svg")}
                  alt='icon_pressure'
                ></img>
                <div className='pressure'>
                  {Math.floor(weather.main.pressure * 0.750063755419211)} мм рт
                  ст
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}
