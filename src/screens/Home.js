import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button, ScrollView, RefreshControl } from 'react-native';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
// import ApiData from '../../teste';
import LocationInput from '../components/LocationInput/LocationInput';
import GradientBackground from '../components/GradientBackground/GradientBackground';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationPermissionScreen from '../components/LocationPermission/LocationPermissionScreen';
import { GetWeatherDataByCoordinates } from '../services/OpenWeatherMapService';

const Home = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState();
  const [forecastWeatherData, setForecastWeatherData] = useState();

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const goToLocationSearch = () => {
    navigation.navigate('LocationSearch');
  };

   // Função para atualizar os dados meteorológicos com base nas coordenadas
   const updateWeatherData = async (latitude, longitude) => {
    try {
      const weatherData = await GetWeatherDataByCoordinates(latitude, longitude);
  
      setCurrentWeatherData(weatherData);
      setForecastWeatherData(weatherData.daily);

      // await AsyncStorage.setItem('currentWeatherData', JSON.stringify(weatherData));
    } catch (error) {
      console.error('Erro ao obter dados meteorológicos:', error);
    }
  };

  // Função para recuperar os dados do AsyncStorage
  // const retrieveDataFromStorage = async () => {
  //   try {
  //     const currentData = await AsyncStorage.getItem('currentWeatherData');
  //     const forecastData = await AsyncStorage.getItem('currentWeatherData');

  //     if (currentData && forecastData) {
  //       // Se os dados forem encontrados, analise-os e defina os estados
  //       setCurrentWeatherData(JSON.parse(currentData));
  //       setForecastWeatherData(JSON.parse(currentData));
  //       console.log("=======================================================",JSON.parse(currentData.daily))
  //     }
  //   } catch (error) {
  //     console.error('Erro ao recuperar dados do AsyncStorage:', error);
  //   }
  // };

  // useEffect(() => {
  //   // Chame a função de recuperação de dados ao montar o componente
  //   retrieveDataFromStorage();
  // }, []);
  // useEffect(() => {
  //   // Chame a função de recuperação de dados ao montar o componente
  //  console.log("========================================================",currentWeatherData)
  // }, [currentWeatherData]);

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
        <Text style={styles.subTitle}>{currentWeatherData?.timezone}</Text>
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
