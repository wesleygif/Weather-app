import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList, Image } from 'react-native';
import axios from 'axios';
import ApiData from '../../teste';

const API_KEY = 'SUA_API_KEY_DO_OPENWEATHER'; // Substitua com sua chave de API

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);

//   useEffect(() => {
//     // Função para fazer a solicitação à API do OpenWeather
//     const fetchWeatherData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.openweathermap.org/data/2.5/onecall?lat=SEU_LAT&lon=SEU_LON&appid=${API_KEY}`
//         );
//         setWeatherData(response.data);
//       } catch (error) {
//         console.error('Erro ao buscar dados do clima:', error);
//       }
//     };

//     // Chame a função para buscar dados do clima ao montar a tela
//     fetchWeatherData();
//   }, []);

//   if (!weatherData) {
//     return (
//       <View style={styles.container}>
//         <Text>Carregando...</Text>
//       </View>
//     );
//   }

  return (
    <View style={styles.container}>
      {/* Exiba os dados do clima aqui */}
      {/* Exemplo: */}
      <Text>Temperatura atual: {Math.round(ApiData.current.temp - 273.15)}°C</Text>
      <Text>Temperatura atual: {ApiData.current.temp}°C</Text>
      <Text>Condição: {ApiData.current.weather[0].description}</Text>

      <Text>Previsão do Tempo</Text>
      <FlatList
        data={ApiData.daily.slice(0, 4)} // Exibir apenas os dois primeiros dias
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View key={item.dt}>
            <Text>Dia {new Date(item.dt * 1000).toLocaleDateString('pt-BR')}</Text>
            <Text>Tempo: {item.weather[0].description}</Text>
            <Text>Temperatura Mínima: {item.temp.min}°C</Text>
            <Text>Temperatura Máxima: {item.temp.max}°C</Text>
            <Text>Umidade: {item.humidity}%</Text>
            <Image
              source={{ uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png` }}
              style={{ width: 50, height: 50 }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WeatherScreen;
