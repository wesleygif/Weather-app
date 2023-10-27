import React from 'react';
import { View } from 'react-native';
import LocationInput from '../../components/LocationInput/LocationInput';

const LocationSearchScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "black" }}>
      <LocationInput />
    </View>
  );
};

export default LocationSearchScreen;
