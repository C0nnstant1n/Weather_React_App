import * as React from "react";
import axios from "axios";
import { openweather_key } from "../../../../secrets";
import "./openweather-5.scss";

// В тех задании указывается использовать One Call API OpenWeather,
// но так как для регистрации нужно указывать платёжные данные,
// что невозможно из России, используются бесплатный ключ OpenWeather

interface ChildrenData {
  children: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherInfo[];
  city: CityInfo;
}

interface WeatherInfo {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export default function FiveDaysApi(props: ChildrenData) {
  const weather_type: WeatherData = {
    cod: "",
    message: 0,
    cnt: 0,
    list: [],
    city: [],
  };
  const [weather, setWeather] = React.useState(weather_type);

  let lat: string = "0";
  let lon: string = "0";
  const status = React.useRef("");

  if (status.current != props.children) {
    const coordinates = props.children;
    const c = coordinates.split(" ");
    lat = c[1];
    lon = c[0];
    const weather_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openweather_key}&units=metric&lang=ru`;

    if (props.children) {
      axios.get(weather_url).then((request) => {
        setWeather(request.data);
      });
    }
  }

  if (weather.list.length) {
    status.current = props.children;
    const days = GroupByDay(weather.list);
    return (
      <>
        {
          <div className='five-days-card'>
            <div className='card-filter'>
              <h2>Прогноз на 5 дней</h2>
              <div className='day-card'>
                {days.map((day) => (
                  <>
                    <div
                      className='date'
                      key={new Date(day[0].dt * 1000).getDate()}
                    >
                      <h4>
                        {new Date(day[0].dt * 1000).getDate()}
                        &nbsp;
                        {getMonthName(new Date(day[0].dt * 1000))}
                      </h4>
                      <p>{getWeekDay(new Date(day[0].dt * 1000))}</p>
                      {WeatherByDay(day)}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        }
      </>
    );
  } else {
    return <h3>Loading</h3>;
  }
}

function GroupByDay(list: WeatherData["list"]) {
  const grouped = [];

  for (const item of list) {
    const day = new Date(item.dt * 1000);
    const dt = day.getDate();

    if (!grouped[dt]) {
      grouped[dt] = [];
    }
    grouped[dt].push(item);
  }
  return Object.values(grouped);
}

function WeatherByDay(day_data: array) {
  return (
    <ul className='day'>
      <hr />
      {day_data.map((item) => (
        <li className='hours' key={new Date(item.dt * 1000).getHours()}>
          <div className='hours-icon'>
            <p>
              {new Date(item.dt * 1000).getHours()}:
              {new Date(item.dt * 1000).getMinutes()}0
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt='weather-icon'
            />
          </div>
          <div className='hours-weather'>
            <span className='temp'>
              {Math.round(item.main.temp)} <sup>o</sup>C
            </span>
            <p>{item.weather[0].description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function getWeekDay(date) {
  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  return days[date.getDay()];
}

function getMonthName(date) {
  const days = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сент",
    "Окт",
    "Нояб",
    "Дек",
  ];
  return days[date.getMonth()];
}
