import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, ScrollView, RefreshControl } from 'react-native';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import GradientBackground from '../components/GradientBackground/GradientBackground';
import LocationPermissionScreen from '../components/LocationPermission/LocationPermissionScreen';
import { GetWeatherDataByCoordinates } from '../services/OpenWeatherMapService';

const Home = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState();
  const [forecastWeatherData, setForecastWeatherData] = useState();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

   const updateWeatherData = async (latitude, longitude) => {
    try {
      const weatherData = await GetWeatherDataByCoordinates(latitude, longitude);
  
      setCurrentWeatherData(weatherData);
      setForecastWeatherData(weatherData.daily);
    } catch (error) {
      console.error('Erro ao obter dados meteorológicos:', error);
    }
  };

  currentWeatherData

  return (
    <GradientBackground style={styles.container}>
      <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Meu Local</Text>
        <Text style={styles.subTitle}>{currentWeatherData?.timezone.split('/').pop().replace('_', ' ')}</Text>
        <LocationPermissionScreen onLocationUpdate={updateWeatherData} />
          {currentWeatherData ? (
              <WeatherInfo currentData={currentWeatherData} />
            ) : (
              <Text>Carregando...</Text>
            )}
      </SafeAreaView>
      {currentWeatherData && currentWeatherData.daily ? (
        <View style={styles.forecastContainer}>
          <WeatherForecast forecastData={currentWeatherData.daily} />
        </View>
      ) : (
        <Text>Previsão do tempo não disponível.</Text>
      )}
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  forecastContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 35,
  },
  subTitle: {
    fontSize: 30,
  },
});

export default Home;
