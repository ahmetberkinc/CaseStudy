import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Constants from '../../../../constants';

const FavoriteAction = () => {
  //Responsible for instant ui change
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onLongPress={() => setColorPickerVisibility(true)}
        style={styles.favoriteContainer}>
        <Entypo
          color={isFavorite ? Constants.ORANGE : Constants.GRAY}
          name={'star'}
          size={32}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteContainer: {
    position: 'absolute',
    right: 8,
    top: 8,
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 10,
    zIndex: 99,
  },
});

export default FavoriteAction;
