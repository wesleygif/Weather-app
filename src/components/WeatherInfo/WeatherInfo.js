import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeatherDescription from '../../utils/WeatherDescription';
import WeatherIcon from '../WeatherIcon/WeatherIcon';

const WeatherInfo = ({ currentData }) => {
  const [weatherData, setWeatherData] = useState(currentData);
  const [maxTemperature, setMaxTemperature] = useState(currentData.daily[0]?.temp.max);
  const [minTemperature, setMinTemperature] = useState(currentData.daily[0]?.temp.min);

  const updateWeatherData = (newData) => {
    setWeatherData(newData);
    setMaxTemperature(newData.daily[0]?.temp.max);
    setMinTemperature(newData.daily[0]?.temp.min);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <WeatherIcon iconCode={weatherData.current.weather[0].icon} width={100} height={100} />
      </View>
      <Text style={styles.graus}>{Math.round(weatherData.current.temp - 273.15)}°</Text>
      <Text style={styles.subText}><WeatherDescription description={weatherData.current.weather[0].description} /></Text>
      <Text style={styles.tempMinMax}>
        Máx.: {Math.round(maxTemperature - 273.15)}° Mín.: {Math.round(minTemperature - 273.15)}°
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  graus: {
    fontSize: 90,
  },
  subText: {
    fontSize: 18,
  },
  tempMinMax: {
    fontSize: 16,
  },
});

export default WeatherInfo;
