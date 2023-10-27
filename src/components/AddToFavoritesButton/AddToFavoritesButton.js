import React from 'react';
import { Button } from 'react-native';

const AddToFavoritesButton = ({ locationData, onAddToFavorites }) => {
  return (
    <Button
      title="Adicionar aos Favoritos"
      onPress={() => onAddToFavorites(locationData)}
    />
  );
};

export default AddToFavoritesButton;
