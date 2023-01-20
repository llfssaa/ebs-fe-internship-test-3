import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import AlternativeWeatherCard from '../molecules/AlternativeWeatherCard';
import { IWeatherResponse } from '../types/types';

interface IProps {
  data: IWeatherResponse[];
}
function AlternativeWeatherCardContainer({ data }: IProps) {
  const helpFunc = (date: string) => {
    const filteredDay = data.filter((item: IWeatherResponse) => {
      return dayjs(item.dt_txt).format('DD-MM-YYYY') === dayjs(date).format('DD-MM-YYYY');
    });
    return {
      maxTemp: Math.max(...filteredDay.map((item: IWeatherResponse) => item.main.temp_max)),
      minTemp: Math.min(...filteredDay.map((item: IWeatherResponse) => item.main.temp_min)),
    };
  };

  const filteredData = data.filter((item: IWeatherResponse) => {
    return dayjs(item.dt_txt).format('HH:mm') === '21:00';
  });
  const helper = (item: IWeatherResponse) => {
    return {
      maxTemp: Math.floor(helpFunc(item.dt_txt).maxTemp),
      minTemp: Math.floor(helpFunc(item.dt_txt).minTemp),
      id: item.dt,
      date: dayjs().isSame(item.dt_txt, 'day') ? 'Today' : dayjs(item.dt_txt).format('ddd D'),
      info: item.weather[0].main,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    };
  };

  return (
    <div className="alt-weather-card-wrapper">
      {filteredData ? (
        filteredData.map((item: IWeatherResponse) => (
          <Link to={`/${dayjs(item.dt_txt).format('ddd D')}`} key={item.dt}>
            <AlternativeWeatherCard key={item.dt} data={helper(item)} />
          </Link>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default AlternativeWeatherCardContainer;
