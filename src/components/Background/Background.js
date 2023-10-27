import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const Background = ({ children }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getBackgroundColor = () => {
    if (currentHour >= 6 && currentHour < 12) {
      return 'blue'; // Cor azul para a manhã
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'red'; // Cor amarela para a tarde
    } else {
      return 'rgba(42, 26, 76, 1)'; // Cor vermelha para a noite
    }
  };

  const backgroundColor = getBackgroundColor();

  return <View style={[styles.container, { backgroundColor }]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Background;
