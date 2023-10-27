import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator  } from 'react-native';
import { getLocationCoordinates } from '../../services/LocationService';
import { GetWeatherDataByCoordinates } from '../../services/OpenWeatherMapService';
import WeatherDescription from '../../utils/WeatherDescription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const LocationInput = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true); // Marque que a pesquisa está em andamento

    try {
      const locationData = await getLocationCoordinates(location);
      setCoordinates(locationData);

      const weatherData = await GetWeatherDataByCoordinates(locationData.lat, locationData.lng);
      setWeatherData(weatherData);
      setSearchCompleted(true); // Marque que a pesquisa foi concluída com sucesso
    } catch (error) {
      setIsLoading(false);
      console.error('Erro ao buscar coordenadas:', error);
    } finally {
      setIsLoading(false); // Marque que a pesquisa terminou, seja com sucesso ou erro
    }
  };

  const renderLoadingIndicator = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return null;
  };

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
      // Reset the data when the screen is focused
      setLocation('');
      setCoordinates(null);
      setWeatherData(null);
      setIsFavorite(false);
      setIsLoading(false);
    }, [])
  );
  

  return (
    <View>
    {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    <TextInput
      placeholder="Insira o nome da localização"
      value={location}
      onChangeText={(text) => setLocation(text)}
      style={{ borderBottomWidth: 1, padding: 10 }}
    />
    <Button title="Pesquisar" onPress={handleSearch} />

    {searchCompleted && weatherData && (
      <View>
        <Text>{weatherData.timezone}</Text>
        <Text>Temperatura Atual: {Math.round(weatherData.current.temp - 273.15)} °C</Text>
        <Text><WeatherDescription description={weatherData.current.weather[0].description} /></Text>
        <Button title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'} onPress={handleFavorite} />
      </View>
    )}
  </View>
  );
};

export default LocationInput;
