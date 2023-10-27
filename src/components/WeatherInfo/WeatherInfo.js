import React from 'react';
import { View, Text } from 'react-native';
import WeatherDescription from '../../utils/WeatherDescription';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

const WeatherInfo = ({ currentData }) => (
  <View>
     <WeatherIcon iconCode={currentData.weather[0].icon} />
    <Text>Temperatura atual: {Math.round(currentData.temp - 273.15)}°C</Text>
    <Text>Condição: <WeatherDescription description={currentData.weather[0].description} /></Text>
  </View>
);

export default WeatherInfo;
