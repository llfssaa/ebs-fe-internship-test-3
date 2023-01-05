import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Route, Routes } from 'react-router-dom';
import WeatherCard from './molecules/WeatherCard';
import Form from './molecules/Form';
import { IWeatherData } from './types/types';
import useDebounce from './helpers/helpers';
import Tabs from './molecules/Tabs';

function App() {
  const [weatherData, setWeatherData] = useState<IWeatherData[]>([]);
  const [city, setCity] = useState('Birmingham');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };
  const debounceValue = useDebounce(city, 5000);
  useEffect(() => {
    const fetchResults = async () => {
      if (debounceValue) {
        const response = await axios.get('http://localhost:8000/weather/');
        setWeatherData(response.data);
      } else {
        setWeatherData([]);
      }
    };
    fetchResults();
  }, [debounceValue]);

  const filterForToday = (): any =>
    weatherData.find((data) => (dayjs().isSame(data.time, 'day') && data.city === city ? data : null));

  return (
    <div>
      <Form handleChange={handleChange} city={city} />
      <Tabs />
      <Routes>
        <Route path="/today" element={<WeatherCard data={filterForToday()} />} />)
      </Routes>
    </div>
  );
}

export default App;
