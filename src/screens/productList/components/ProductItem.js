import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Constants from '../../../../constants';
import FavoriteAction from './FavoriteAction';
import FastImage from 'react-native-fast-image';
import AddtoCart from './AddtoCart';

const ProductItem = ({product}) => {
  const renderFavorite = () => {
    return <FavoriteAction product={product} />;
  };

  const renderImage = () => {
    return (
      <View>
        {renderFavorite()}
        <FastImage
          style={{
            width: Constants.SCREEN_WIDTH / 2.5,
            height: Constants.SCREEN_WIDTH / 2.5,
          }}
          source={{uri: product?.image}}
          resizeMode="cover"
        />
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <View>
        <Text style={styles.price}>{product?.price} ₺</Text>
        <Text numberOfLines={2} style={styles.title}>
          {product?.name}
        </Text>
      </View>
    );
  };

  const renderAddtoCart = () => {
    return (
      <View style={{marginTop: 10}}>
        <AddtoCart />
      </View>
    );
  };

  return (
    <TouchableOpacity activeOpacity={1} style={styles.productContainer}>
      {renderImage()}
      {renderDetails()}
      {renderAddtoCart()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    marginLeft: 5,
  },
  productContainer: {
    borderRadius: 10,
    backgroundColor: Constants.WHITE,
    flex: 0.48,
    marginVertical: 4,
    padding: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: Constants.BLACK,
    marginTop: 10,
  },
  price: {
    marginTop: 15,
    fontSize: 14,
    fontWeight: '800',
    color: Constants.BLUE,
  },
});

export default ProductItem;
