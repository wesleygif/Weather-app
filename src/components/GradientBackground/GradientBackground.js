import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const GradientBackground = ({ children }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getBackgroundImage = () => {
    if (currentHour >= 6 && currentHour < 17) {
      return require('./../../assets/Manha.jpg');
    } else if (currentHour >= 17 && currentHour < 18) {
      return require('./../../assets/fimTarde.jpg'); 
    } else if (currentHour >= 18 && currentHour < 4) {
      return require('./../../assets/fimTarde.jpg')} 
      else {
      return require('./../../assets/fimTarde.jpg'); 
    }
  };

  const backgroundImage = getBackgroundImage();

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GradientBackground;
