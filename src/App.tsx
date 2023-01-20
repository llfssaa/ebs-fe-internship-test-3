import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import Form from './molecules/Form';

import Tabs from './molecules/Tabs';
import WeatherCardContainer from './organisms/WeatherCardContainer';
import AlternativeWeatherCardContainer from './organisms/AlternativeWeatherCardContainer';
import { IWeatherResponse } from './types/types';
import useDebounce from './helpers/helpers';

function App() {
  const [city, setCity] = useState('Birmingham');
  const [cityName, setCityName] = useState<string>('');
  const API_KEY = '37fbefa34bd1fe7015c40e73fe433de7';
  const [weatherData, setWeatherData] = useState<IWeatherResponse[]>([]);
  const debounceValue = useDebounce(city, 500);
  useEffect(() => {
    const fetchResults = async () => {
      if (debounceValue) {
        try {
          const response = await axios.get(
            /* `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}` */
            'http://localhost:5000/list',
          );
          setWeatherData(response.data.list);
          setCityName(response.data.city.name);
        } catch (error) {
          console.log(error);
        }
      } else {
        setWeatherData([]);
      }
    };
    fetchResults().then((r) => console.log(r));
  }, [debounceValue]);

  const handleFilter = (day: string) => {
    return weatherData.filter((item: IWeatherResponse) => {
      return dayjs(item.dt_txt).format('ddd D') === day;
    });
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };
  return (
    <div>
      <Form handleChange={handleChange} city={city} />
      <Tabs />
      <Routes>
        <Route path="/:day" element={<WeatherCardContainer handleFilter={handleFilter} cityName={cityName} />} />
        )
        <Route path="/shows-5-day-forecast" element={<AlternativeWeatherCardContainer data={weatherData} />} />)
      </Routes>
    </div>
  );
}

export default App;
