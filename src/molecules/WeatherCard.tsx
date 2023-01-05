import React from 'react';
import dayjs from 'dayjs';
import { IWeatherData } from '../types/types';

interface IWeatherCardProps {
  data: IWeatherData;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(localizedFormat);

function WeatherCard({ ...data }: IWeatherCardProps) {
  const { city, temperature, time, info, description } = data.data;
  return (
    <div className="weather-card">
      <p>{city}</p>
      <p>as of {dayjs(time).format('LT')}</p>
      <p className="temp">{temperature} °</p>
      <p className="info">{info}</p>
      <p>{description}</p>
    </div>
  );
}

export default WeatherCard;
