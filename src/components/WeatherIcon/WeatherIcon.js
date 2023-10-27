import React from 'react';
import { Image } from 'react-native';

const WeatherIcon = ({ iconCode, width, height }) => (
  <Image
    source={{ uri: `https://openweathermap.org/img/w/${iconCode}.png` }}
    style={{ width: width, height: height }}
  />
);

export default WeatherIcon;
