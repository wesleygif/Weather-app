import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { getLocationCoordinates } from '../../services/LocationService';
import { getWeatherDataByCoordinates } from '../../services/OpenWeatherMapService';

const LocationInput = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

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
  console.log("=====",weatherData,"=====")
  return (
    <View>
      <TextInput
        placeholder="Insira o nome da localização"
        value={location}
        onChangeText={(text) => setLocation(text)}
        style={{ borderBottomWidth: 1, padding: 10 }}
      />
      <Button title="Pesquisar" onPress={handleSearch} />

      {coordinates && (
        <View>
          {/* <Text>Nome da Localização: {weatherData.timezone}</Text> */}
          <Text>Latitude: {coordinates.lat}</Text>
          <Text>Longitude: {coordinates.lng}</Text>
        </View>
      )}

      {weatherData && (
        <View>
          <Text>Temperatura Atual: {weatherData.current.temp} °C</Text>
          <Text>Condição: {weatherData.current.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

export default LocationInput;
