import React from 'react';
import { View, Text } from 'react-native';
import { FlatList } from 'react-native';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import WeatherDescription from '../../utils/WeatherDescription';

const getDayOfWeek = (timestamp) => {
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const date = new Date(timestamp * 1000);
  const today = new Date();
  
  if (date.toDateString() === today.toDateString()) {
    return 'Hoje';
  } else {
    const dayOfWeek = daysOfWeek[date.getDay()];
    return dayOfWeek;
  }
};

const WeatherForecast = ({ forecastData }) => (
  <View style={styles.Container}>
    <FlatList
        showsHorizontalScrollIndicator={false} // Adicione esta linha
        horizontal={true}
        data={forecastData.slice(0, 6)}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => (
          <View key={item.dt} style={styles.item}>
            <Text style={styles.textCenter}>{getDayOfWeek(item.dt)}</Text>
            <WeatherIcon iconCode={item.weather[0].icon} width={50} height={50} />

            <Text style={styles.textCenter}>Tempo: <WeatherDescription description={item.weather[0].description} /></Text>

            <Text style={styles.textCenter}>Temp. Mín. : {Math.round(item.temp.min - 273.15)}°C</Text>
            <Text style={styles.textCenter}>Temp. Máx.: {Math.round(item.temp.max - 273.15)}°C</Text>
          </View>
        )}
        style={styles.flatList}
      />
  </View>
  
);

const styles = {
  Container: {
    justifyContent: 'flex-end',
   marginTop: 10,
  },
  item: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.23)',
    width: 120,
    height: 180,
    margin: 10,
  },
  textCenter: {
    marginTop: 10,
    textAlign: 'center',
  },
};

export default WeatherForecast;
