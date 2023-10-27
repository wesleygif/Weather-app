import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { getLocationCoordinates } from '../../services/LocationService'; 

const LocationInput = () => {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleSearch = async () => {
    try {
      const locationData = await getLocationCoordinates(location);
      setCoordinates(locationData);
    } catch (error) {
      console.error('Erro ao buscar coordenadas:', error);
    }
  };
  
  return (
    <View>
      <TextInput
        placeholder="Insira o nome da localização"
        value={location}
        onChangeText={text => setLocation(text)}
        style={{ borderBottomWidth: 1, padding: 10 }}
      />
      <Button title="Pesquisar" onPress={handleSearch} />

      {coordinates && (
        <View>
          <Text>Latitude: {coordinates.lat}</Text>
          <Text>Longitude: {coordinates.lng}</Text>
        </View>
      )}
    </View>
  );
};

export default LocationInput;
