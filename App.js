import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WeatherScreen from './src/screens/WeatherScreen';
import Home from './src/screens/Home';
import Background from './src/components/Background/Background';

export default function App() {
  return (
    <NavigationContainer>
      <Background>
        <Home/>
      </Background>
      
      {/* <WeatherScreen /> */}
     
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});