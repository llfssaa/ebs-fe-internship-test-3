import React from 'react';

export interface IWeatherData extends React.HTMLAttributes<any> {
  id: string;
  city: string;
  time: string;
  temperature: string;
  info: string;
  description: string;
}
