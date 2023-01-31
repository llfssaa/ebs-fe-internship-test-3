import React from 'react';
import './molecules.scss';

interface IAltWeatherCardProps {
  data: any;
}
function AlternativeWeatherCard({ data }: IAltWeatherCardProps) {
  const { maxTemp, minTemp, date, description, icon }: any = data;
  return (
    <div className="alt-weather-card">
      <div className="date">{date}</div>
      <div className="max-temp">{maxTemp} °C</div>
      <div className="min-temp">{minTemp} °C</div>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather-icon" />
      <div className="info">{description}</div>
    </div>
  );
}

export default AlternativeWeatherCard;
