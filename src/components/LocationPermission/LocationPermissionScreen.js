import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationPermissionScreen = ({ onLocationUpdate }) => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [locationData, setLocationData] = useState(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      console.log('Permissão concedida');
      setPermissionStatus('granted');
      updateLocation();
    } else {
      console.log('Permissão não concedida');
      setPermissionStatus('denied');
    }
  };

  const updateLocation = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
      setLocationData(location);
      onLocationUpdate(latitude, longitude);
    }
  };

  const handleRetryPermission = () => {
    setPermissionStatus(null);
    requestLocationPermission();
  };

  useEffect(() => {
    requestLocationPermission();
    const intervalId = setInterval(updateLocation, 300000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      {permissionStatus === 'denied' && (
        <View>
          <Text>Permissão de localização negada. Para ativar, clique no botão abaixo:</Text>
          <Button title="Usar minha localização" onPress={handleRetryPermission} />
        </View>
      )}
    </View>
  );
};

export default LocationPermissionScreen;
