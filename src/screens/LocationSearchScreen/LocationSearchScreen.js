import React from 'react';
import { View, Text } from 'react-native';
import LocationInput from '../../components/LocationInput/LocationInput';

const LocationSearchScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Pesquisa de Localização</Text>
      <LocationInput />
    </View>
  );
};

export default LocationSearchScreen;
