import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet  } from 'react-native';
import { getLocationCoordinates } from '../../services/LocationService';
import { GetWeatherDataByCoordinates } from '../../services/OpenWeatherMapService';
import WeatherDescription from '../../utils/WeatherDescription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ApiData from '../../../teste';


const LocationInput = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const locationData = await getLocationCoordinates(location);
      setCoordinates(locationData);

      const weatherData = await GetWeatherDataByCoordinates(locationData.lat, locationData.lng);
      setWeatherData(weatherData);
      setSearchCompleted(true);
    } catch (error) {
      setIsLoading(false);
      console.error('Erro ao buscar coordenadas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const renderLoadingIndicator = () => {
  //   if (isLoading) {
  //     return <ActivityIndicator size="large" color="#0000ff" />;
  //   }
  //   return null;
  // };

  const handleFavorite = async () => {
    if (weatherData) {
      try {
        const favoriteWeatherDataJSON = await AsyncStorage.getItem('favoriteWeatherData');
        let favoriteWeatherDataArray = favoriteWeatherDataJSON ? JSON.parse(favoriteWeatherDataJSON) : [];

        const isAlreadyFavorite = favoriteWeatherDataArray.some(item => item.timezone === weatherData.timezone);

        if (!isAlreadyFavorite) {
          favoriteWeatherDataArray.push(weatherData);
          await AsyncStorage.setItem('favoriteWeatherData', JSON.stringify(favoriteWeatherDataArray));
        }

        // Toggle the isFavorite state when the button is clicked
        setIsFavorite(!isAlreadyFavorite);
      } catch (error) {
        console.error('Erro ao adicionar aos favoritos:', error);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLocation('');
      setCoordinates(null);
      setWeatherData(null);
      setIsFavorite(false);
      setIsLoading(false);
    }, [])
  );
  

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <TextInput
        placeholder="Pesquise a sua localização"
        value={location}
        onChangeText={(text) => setLocation(text)}
        style={styles.input}
      />
      <Button title="Pesquisar" onPress={handleSearch} style={styles.button} />
    
      {searchCompleted && weatherData && (
         <View style={styles.weatherInfo}>
            <Text style={styles.weatherText}>{weatherData.timezone}</Text>
            <Text style={styles.weatherText}>Temperatura Atual: {Math.round(weatherData.current.temp - 273.15)} °C</Text>
            <Text style={styles.weatherText}><WeatherDescription description={weatherData.current.weather[0].description} /></Text>
            <Button
              title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              onPress={handleFavorite}
              style={styles.favoriteButton}
            />
       </View>
       )} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    height: 50,
    fontSize: 18,
  },
  button: {
    marginTop: 10,
  },
  weatherInfo: {
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 300,
    height: 150,
    marginTop: 60,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 8,
  },
  favoriteButton: {
    marginTop: 20,
  },
});

export default LocationInput;
