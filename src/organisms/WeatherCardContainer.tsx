import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WeatherCard from '../molecules/WeatherCard';
import { IWeatherData, IWeatherResponse } from '../types/types';
import './organisms.scss';

interface IWeatherCardContainerProps {
  cityName: string;
  handleFilter: (day: string) => IWeatherResponse | undefined;
}
function WeatherCardContainer({ cityName, handleFilter }: IWeatherCardContainerProps) {
  const { day } = useParams();
  const navigate = useNavigate();
  const filteredData = handleFilter(day);
  const helper = (item: IWeatherResponse, city: string): IWeatherData => {
    return {
      temperature: item.main.temp,
      id: item.dt,
      time: item.dt_txt,
      info: item.weather[0].main,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      city,
    };
  };

  return (
    <div className="weather-card-container">
      {filteredData ? (
        <WeatherCard key={filteredData.dt} data={helper(filteredData, cityName)} />
      ) : (
        <p>No results found</p>
      )}
      <button type="button" onClick={() => navigate(-1)}>
        ⮜ Back
      </button>
    </div>
  );
}

export default WeatherCardContainer;
