import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AddtoCart from '../productList/components/AddtoCart';
import Constants from '../../../constants';
import {SafeAreaView} from 'react-native-safe-area-context';

const CartView = ({cartProducts}) => {
  const renderCartProducts = () => {
    return cartProducts?.map(cartProduct => {
      return (
        <View key={cartProduct.id} style={styles.cartContainer}>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text style={styles.title}>
              {cartProduct?.brand} {cartProduct?.name}
            </Text>
            <Text style={styles.price}>{cartProduct?.price} ₺</Text>
          </View>
          <AddtoCart product={cartProduct} />
        </View>
      );
    });
  };

  const renderBottomDetails = () => {
    return (
      <View style={styles.containerBottomDetail}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.priceText}>Price:</Text>
          <Text style={styles.priceValueText}>{calculateTotalPrice()} ₺</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.containerComplete}>
            <Text style={styles.completeText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  function calculateTotalPrice() {
    let totalPrice = 0;

    cartProducts?.map(
      cartProduct => (totalPrice += cartProduct.count * cartProduct.price),
    );

    return totalPrice;
  }

  return (
    <SafeAreaView style={styles.containerMain}>
      <ScrollView>{renderCartProducts()}</ScrollView>
      {renderBottomDetails()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    marginHorizontal: 10,
    flex: 1,
  },
  cartContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: Constants.BLACK,
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: Constants.BLUE,
  },
  containerBottomDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
  containerComplete: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 200,
    backgroundColor: Constants.BLUE,
    borderRadius: 10,
  },
  completeText: {
    fontSize: 22,
    color: Constants.WHITE,
    fontWeight: '600',
  },
});

export default CartView;
