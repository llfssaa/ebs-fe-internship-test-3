import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import WeatherCard from './molecules/WeatherCard';
import Form from './molecules/Form';
import { IWeatherData } from './types/types';
import useDebounce from './helpers/helpers';

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

  return (
    <div>
      <Form handleChange={handleChange} city={city} />
      {weatherData ? (
        weatherData
          .filter((data) => (dayjs().isSame(data.time, 'day') && data.city === city ? data : null))
          .map((data) => <WeatherCard key={data.id} data={data} />)
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
