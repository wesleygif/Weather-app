import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationPermissionScreen = ({ onLocationUpdate }) => {
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [locationData, setLocationData] = useState(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      setPermissionStatus('granted');
      updateLocation();
    } else {
      setPermissionStatus('denied');
    }
  };

  const updateLocation = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
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
