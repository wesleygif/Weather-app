import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { getLocationCoordinates } from '../../services/LocationService';
import { getWeatherDataByCoordinates } from '../../services/OpenWeatherMapService';
import WeatherDescription from '../../utils/WeatherDescription';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Correção aqui

const LocationInput = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSearch = async () => {
    try {
      const locationData = await getLocationCoordinates(location);
      setCoordinates(locationData);

      const weatherData = await getWeatherDataByCoordinates(locationData.lat, locationData.lng);
      setWeatherData(weatherData);
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
    }
  };

  const handleFavorite = async () => {
    if (weatherData) {
      try {
        // Busque os dados existentes no AsyncStorage, se houver algum
        const favoriteWeatherDataJSON = await AsyncStorage.getItem('favoriteWeatherData');
        let favoriteWeatherDataArray = favoriteWeatherDataJSON ? JSON.parse(favoriteWeatherDataJSON) : [];
  
        // Verifique se o item já está nos favoritos
        const isAlreadyFavorite = favoriteWeatherDataArray.some(item => item.timezone === weatherData.timezone);
  
        // Se não estiver nos favoritos, adicione-o ao array
        if (!isAlreadyFavorite) {
          favoriteWeatherDataArray.push(weatherData);
  
          // Salve o array atualizado de volta no AsyncStorage
          await AsyncStorage.setItem('favoriteWeatherData', JSON.stringify(favoriteWeatherDataArray));
        }
      } catch (error) {
        console.error('Erro ao adicionar aos favoritos:', error);
      }
    }
  };
  

  return (
    <View>
      <TextInput
        placeholder="Insira o nome da localização"
        value={location}
        onChangeText={(text) => setLocation(text)}
        style={{ borderBottomWidth: 1, padding: 10 }}
      />
      <Button title="Pesquisar" onPress={handleSearch} />

      {weatherData && (
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
