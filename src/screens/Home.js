import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import ApiData from '../../teste';
import LocationInput from '../components/LocationInput/LocationInput';
import GradientBackground from '../components/GradientBackground/GradientBackground';

const Home = () => {
  const currentWeatherData = ApiData;
  const forecastWeatherData = ApiData.daily;

  return (
    <GradientBackground style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Meu Local</Text>
        <Text style={styles.subTitle}>{currentWeatherData.timezone}</Text>
        <WeatherInfo currentData={currentWeatherData} />
        <View style={styles.container2}>
          <Text>Previsão do Tempo</Text>
          <WeatherForecast forecastData={forecastWeatherData} />
        </View>
        <LocationInput />
      </SafeAreaView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  safeArea: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
  },
  subTitle: {
    fontSize: 30,
  }
});

export default Home;
