import React from 'react';
import { View, Text, StyleSheet, SafeAreaView  } from 'react-native';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import ApiData from '../../teste';
import Background from '../components/Background/Background';
// import WeatherDescription from '../utils/WeatherDescription';

const Home = () => {

    const currentWeatherData = ApiData.current;
    const forecastWeatherData = ApiData.daily;

  return (
    <Background>
    <SafeAreaView style={styles.container}>
      <Text>Temperatura Atual</Text>
      <WeatherInfo currentData={currentWeatherData} />
      <Text>Previsão do Tempo</Text>
      <WeatherForecast forecastData={forecastWeatherData} />
    </SafeAreaView>
  </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default Home;
