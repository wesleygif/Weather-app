import React from 'react';
import { Image } from 'react-native';

const WeatherIcon = ({ iconCode }) => (
  <Image
    source={{ uri: `https://openweathermap.org/img/w/${iconCode}.png` }}
    style={{ width: 50, height: 50 }}
  />
);

export default WeatherIcon;
