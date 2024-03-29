import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeatherDescription from '../../utils/WeatherDescription';

const FavoritesScreen = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchFavoriteItems = async () => {
    try {
      const savedItems = await AsyncStorage.getItem('favoriteWeatherData');
      if (savedItems !== null) {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems)) {
          setFavoriteItems(parsedItems);
        } else {
          console.warn('Dados recuperados do AsyncStorage não são um array válido.');
        }
      }
    } catch (error) {
      setError('Erro ao recuperar favoritos: ', + error.message);
    }
  };

  useEffect(() => {
    fetchFavoriteItems();
    const interval = setInterval(fetchFavoriteItems, 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  

  const removeItem = async (item) => {
    try {
      const updatedItems = favoriteItems.filter((favItem) => favItem.timezone !== item.timezone);
      await AsyncStorage.setItem('favoriteWeatherData', JSON.stringify(updatedItems));
      setFavoriteItems(updatedItems);
    } catch (error) {
      setError('Erro ao remover o item: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Itens Favoritados</Text>
        <FlatList
        showsVerticalScrollIndicator={false}
          data={favoriteItems}
          keyExtractor={(item) => item.timezone}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhum item favoritado</Text>
          )}
          renderItem={({ item }) => {
            return (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}> {item.timezone.split('/').pop().replace('_', ' ')}</Text>

                <Text style={styles.itemText}>Temperatura Atual: {Math.round(item.current.temp - 273.15)} °C</Text>

                <Text style={styles.itemText}><WeatherDescription description={item.current.weather[0].description} /></Text>

                <Text style={styles.itemText}>Temp. Mín. : {Math.round(item.daily[0].temp.min - 273.15)}°C</Text>

                <Text style={styles.itemText}>Temp. Máx.: {Math.round(item.daily[0].temp.max - 273.15)}°C</Text>

                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item)}
                >
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    textAlign: "center",
    marginBottom: 26,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
  removeButtonText: {
    color: 'white',
  },
});

export default FavoritesScreen;
