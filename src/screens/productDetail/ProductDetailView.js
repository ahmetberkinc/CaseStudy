import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import Constants from '../../../constants';
import FavoriteAction from '../productList/components/FavoriteAction';
import AddtoCart from '../productList/components/AddtoCart';
import {SafeAreaView} from 'react-native-safe-area-context';

const ProductDetailView = ({product}) => {
  const renderProductImage = () => {
    return (
      <View>
        {renderFavorite()}
        <FastImage
          style={styles.containerBigImage}
          source={{
            uri: product?.image,
            priority: 'high',
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderFavorite = () => {
    return <FavoriteAction product={product} />;
  };

  const renderDetails = () => {
    return (
      <View>
        <Text style={styles.titleText}>
          {product?.brand + ' ' + product?.name + ' ' + product?.model}
        </Text>
        <Text style={styles.descriptionText}>{product?.description}</Text>
      </View>
    );
  };

  const renderBottomDetails = () => {
    return (
      <View style={styles.containerBottomDetail}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.priceText}>Price:</Text>
          <Text style={styles.priceValueText}>{product?.price} ₺</Text>
        </View>
        {renderAddtoCart()}
      </View>
    );
  };

  const renderAddtoCart = () => {
    return (
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <AddtoCart product={product} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerMain}>
      <ScrollView>
        {renderProductImage()}
        {renderDetails()}
      </ScrollView>
      {renderBottomDetails()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    marginHorizontal: 8,
    flex: 1,
  },
  containerBigImage: {
    height: 300,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: Constants.BLACK,
  },
  descriptionText: {
    marginTop: 10,
    color: Constants.BLACK,
    fontWeight: '400',
  },
  priceText: {
    color: Constants.BLUE,
    fontSize: 20,
  },
  priceValueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Constants.BLACK,
  },
  containerBottomDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default ProductDetailView;
