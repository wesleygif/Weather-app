import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Keyboard, PanResponder  } from 'react-native';
import { getLocationCoordinates } from '../../services/LocationService';
import { GetWeatherDataByCoordinates } from '../../services/OpenWeatherMapService';
import WeatherDescription from '../../utils/WeatherDescription';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Modal } from 'react-native';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import WeatherInfo from '../WeatherInfo/WeatherInfo';
import WeatherForecast from '../WeatherForecast/WeatherForecast';

const LocationInput = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCompleted, setSearchCompleted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWeatherData, setSelectedWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setIsLoading(true);
    Keyboard.dismiss();
    try {
      const locationData = await getLocationCoordinates(location);
      setCoordinates(locationData);
  
      const weatherData = await GetWeatherDataByCoordinates(locationData.lat, locationData.lng);
      setWeatherData(weatherData);
      setSelectedWeatherData(weatherData);
      setSearchCompleted(true);
  
      Keyboard.dismiss();
    } catch (error) {
      setIsLoading(false);
      setError('Erro ao buscar coordenadas: ' + error.message);
    } finally {
      setIsLoading(false);
    }
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
        setSelectedWeatherData(weatherData);
        setIsFavorite(!isAlreadyFavorite);
      } catch (error) {
        setError('Erro ao adicionar aos favoritos: ' + error.message);
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
      {error && <Text style={styles.errorText}>{error}</Text>}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <TextInput
        placeholder="Pesquise a sua localização"
        value={location}
        onChangeText={(text) => setLocation(text)}
        style={styles.input}
        placeholderTextColor="#CCCCCC"
      />
      <Button title="Pesquisar" onPress={handleSearch} style={styles.button} />
  
      {searchCompleted && weatherData && (
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <View style={styles.weatherInfo}>
            <Text style={styles.weatherText}>{weatherData.timezone.split('/').pop().replace('_', ' ')}</Text>
             <WeatherIcon iconCode={weatherData.current.weather[0].icon} width={50} height={50} />
            <Text style={styles.weatherText}>
              Temperatura Atual: {Math.round(weatherData.current.temp - 273.15)} °C
            </Text>
            <Text style={styles.weatherText}>
              <WeatherDescription description={weatherData.current.weather[0].description} />
            </Text>
          </View>
        </TouchableOpacity>
        )
      }
  
  <Modal
    visible={isModalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setIsModalVisible(false)}
  >
  <View style={[styles.modalContainer, { height: '100%', width: '100%', backgroundColor: 'grey' }]}>        
              {weatherData ? (
                <>
                <Text style={styles.subTitle}>{weatherData?.timezone.split('/').pop().replace('_', ' ')}</Text>
                  <WeatherInfo currentData={weatherData} />
                  <Button
                      title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                      onPress={handleFavorite}
                      style={styles.favoriteButton}
                      color="white"
                    />
                </>
             
            ) : (
              <Text>Carregando...</Text>
            )}
          <Button
            title="Fechar Modal"
            onPress={() => setIsModalVisible(false)}
            style={[styles.modalCloseButton, { fontSize: 130 }]}
            color="#FF0000"
          />
        {weatherData && weatherData.daily ? (
                <View style={styles.forecastContainer}>
                  <WeatherForecast forecastData={weatherData.daily} />
                </View>
              ) : (
                <Text>Previsão do tempo não disponível.</Text>
              )}

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  forecastContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 10,
    paddingBottom: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  modalContainer: {
    marginTop: 30,
    paddingTop: 96,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: "white",
    borderRadius: 10,
    borderBottomWidth: 1,
    padding: 10,
    height: 50,
    fontSize: 18,
    backgroundColor: '#848383'
  },
  subTitle: {
    fontSize: 30,
    textAlign: "center",
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
  ModalweatherInfo: {
    justifyContent: "center",
    alignItems: 'center',
    borderRadius: 8,
    width: 300,
    height: 150,
    marginTop: 60,
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
