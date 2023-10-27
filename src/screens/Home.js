import React from 'react';
import { View, Text, StyleSheet, SafeAreaView  } from 'react-native';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import ApiData from '../../teste';
// import WeatherDescription from '../utils/WeatherDescription';

const Home = () => {

    const currentWeatherData = ApiData;
    const forecastWeatherData = ApiData.daily;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meu Local</Text>
      <Text style={styles.subTitle}>{currentWeatherData.timezone}</Text>

      <WeatherInfo currentData={currentWeatherData} />

      <View style={styles.container2}>
        <Text>Previsão do Tempo</Text>
        <WeatherForecast forecastData={forecastWeatherData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        alignItems: 'center',
    },

    textCentered: {
      marginTop: 'auto',
      marginBottom: "auto"
    },
    title: {
        fontSize: 35
    },
    subTitle: {
        fontSize: 30
    }
  });

export default Home;
