import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Constants from '../../../../constants';
import {useRoute, useIsFocused} from '@react-navigation/native';
import {
  addFavProduct,
  checkProductIsFav,
  removeFavProduct,
} from '../../../services/productApi';
import MainContext from '../../../context/MainContext';

const FavoriteAction = ({product}) => {
  //Responsible for instant ui change
  const [isFavorite, setIsFavorite] = useState(false);

  const isFocused = useIsFocused();
  const route = useRoute();

  const {updateFavListToggle, setUpdateFavListToggle} = useContext(MainContext);

  //Used for displaying correct favorite status after navigation,goback()
  useEffect(() => {
    isFocused && checkProductIsFav(product).then(isFav => setIsFavorite(isFav));
  }, [isFocused]);

  function onFavoriteIconPress() {
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      removeFavProduct(product).then(
        () =>
          route.name === 'FavoriteList' &&
          setUpdateFavListToggle(!updateFavListToggle),
      );
    } else {
      addFavProduct(product);
    }
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => onFavoriteIconPress()}
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
