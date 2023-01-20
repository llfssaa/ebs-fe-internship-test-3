import React from 'react';
import dayjs from 'dayjs';
import { IWeatherData } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(localizedFormat);

interface IWeatherCardProps {
  data: IWeatherData;
}
function WeatherCard({ data }: IWeatherCardProps) {
  const { temperature, time, info, description, icon }: IWeatherData = data;
  return (
    <div className="alt-weather-card">
      <div>as of {dayjs(time).format('LT')}</div>
      <div className="temp">{Math.floor(temperature)} °C</div>
      <div className="info">{info}</div>
      <div>{description}</div>
      <img className="weather-card__icon" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
    </div>
  );
}

export default WeatherCard;
