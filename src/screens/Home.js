import React, {useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView,Button } from 'react-native';
import WeatherInfo from '../components/WeatherInfo/WeatherInfo';
import WeatherForecast from '../components/WeatherForecast/WeatherForecast';
import ApiData from '../../teste';
import LocationInput from '../components/LocationInput/LocationInput';
import GradientBackground from '../components/GradientBackground/GradientBackground';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const currentWeatherData = ApiData;
  const forecastWeatherData = ApiData.daily;
  const navigation = useNavigation();

  const goToLocationSearch = () => {
    navigation.navigate('LocationSearch');
  };

  useEffect(() => {
    const retrieveFavoriteWeatherData = async () => {
      try {
        const favoriteWeatherData = await AsyncStorage.getItem('favoriteWeatherData');
        if (favoriteWeatherData) {
          console.log('Dados favoritos:', JSON.parse(favoriteWeatherData));
        }
      } catch (error) {
        console.error('Erro ao recuperar dados favoritos:', error);
      }
    };

    retrieveFavoriteWeatherData();
  }, []);

  return (
    <GradientBackground style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Button title="Ir para Pesquisa de Localização" onPress={goToLocationSearch} />

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
