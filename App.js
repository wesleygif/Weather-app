import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WeatherScreen from './src/screens/WeatherScreen';
import Home from './src/screens/Home';
import GradientBackground from './src/components/GradientBackground/GradientBackground';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <GradientBackground>
          <Home />
          {/* <WeatherScreen /> */}
        </GradientBackground>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
