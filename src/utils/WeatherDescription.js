import React from 'react';
import { Text } from 'react-native';

const WeatherDescription = ({ description }) => {
  const traducoes = {
    'clear sky': 'Céu limpo, sem nuvens',
    'few clouds': 'Poucas nuvens no céu',
    'scattered clouds': 'Nuvens dispersas, algumas nuvens no céu',
    'broken clouds': 'Nuvens quebradas, muitas nuvens, mas ainda visível',
    'overcast clouds': 'Céu nublado, totalmente coberto de nuvens',
    'mist': 'Neblina leve',
    'fog': 'Nevoeiro, visibilidade reduzida',
    'light rain': 'Chuva fraca',
    'moderate rain': 'Chuva moderada',
    'heavy rain': 'Chuva pesada',
    'light snow': 'Neve fraca',
    'moderate snow': 'Neve moderada',
    'heavy snow': 'Neve pesada',
    'hail': 'Granizo',
    'thunderstorm': 'Tempestade com trovões e relâmpagos',
    'tornado': 'Tornado (raro e muito destrutivo)',
  };

  const translatedDescription = traducoes[description] || description;

  return <Text>{translatedDescription}</Text>;
};

export default WeatherDescription;
