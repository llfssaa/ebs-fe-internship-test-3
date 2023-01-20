import React from 'react';
import { useParams } from 'react-router-dom';
import WeatherCard from '../molecules/WeatherCard';
import { IWeatherData, IWeatherResponse } from '../types/types';

interface IWeatherCardContainerProps {
  cityName: string;
  handleFilter: (day: string) => IWeatherResponse[];
}
function WeatherCardContainer({ cityName, handleFilter }: IWeatherCardContainerProps) {
  const { day } = useParams();
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
    <div className="alt-weather-card-wrapper">
      <div>
        Weathers for {cityName} {day ? `on ${day}` : ''}
      </div>
      {filteredData ? (
        filteredData.map((item: IWeatherResponse) => <WeatherCard key={item.dt} data={helper(item, cityName)} />)
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default WeatherCardContainer;
