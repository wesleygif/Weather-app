import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationPermissionScreen = () => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [locationData, setLocationData] = useState(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      console.log('Permissão concedida');
    } else {
      console.log('Permissão não concedida');
    }
  };

  const updateLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    setLocationData(location);
  };

  useEffect(() => {
    requestLocationPermission();
    updateLocation();
    const intervalId = setInterval(updateLocation, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {permissionStatus && <Text>Status da Permissão: {permissionStatus}</Text>}
      {locationData && (
        <View>
          <Text>Latitude: {locationData.coords.latitude}</Text>
          <Text>Longitude: {locationData.coords.longitude}</Text>
        </View>
      )}
    </View>
  );
};

export default LocationPermissionScreen;
