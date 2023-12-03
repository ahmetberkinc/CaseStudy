import React, {useState, useEffect, useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Constants from '../../../../constants';
import {
  checkCartProductCount,
  removeCartProduct,
  updateCartProductCount,
} from '../../../services/productApi';
import {useIsFocused} from '@react-navigation/native';
import MainContext from '../../../context/MainContext';

const AddtoCart = ({product}) => {
  const isFocused = useIsFocused();

  const [productCount, setProductCount] = useState(0);

  const {
    updateCartToggle,
    setUpdateCartToggle,
    cartProductCount,
    setCartProductCount,
  } = useContext(MainContext);

  useEffect(() => {
    isFocused &&
      checkCartProductCount(product).then(count => setProductCount(count));
  }, [isFocused]);

  const renderCountOptions = () => {
    return (
      <View style={styles.containterOption}>
        <TouchableOpacity
          onPress={() => (
            setProductCount(productCount - 1),
            productCount === 1
              ? removeCartProduct(product).then(() => {
                  setUpdateCartToggle(!updateCartToggle),
                    setCartProductCount(cartProductCount - 1);
                })
              : updateCartProductCount(product, productCount - 1).then(() =>
                  setUpdateCartToggle(!updateCartToggle),
                )
          )}
          style={styles.containerOptionItem}>
          <Text style={styles.optionText}>-</Text>
        </TouchableOpacity>
        <View style={styles.containerCount}>
          <Text style={styles.countText}>{productCount}</Text>
        </View>
        <TouchableOpacity
          onPress={() => (
            setProductCount(productCount + 1),
            updateCartProductCount(product, productCount + 1).then(() =>
              setUpdateCartToggle(!updateCartToggle),
            )
          )}
          style={styles.containerOptionItem}>
          <Text style={styles.optionText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return productCount > 0 ? (
    renderCountOptions()
  ) : (
    <TouchableOpacity
      onPress={() => (
        setProductCount(1),
        updateCartProductCount(product, 1).then(() => {
          setUpdateCartToggle(!updateCartToggle),
            setCartProductCount(cartProductCount + 1);
        })
      )}
      style={styles.containerCart}>
      <Text style={styles.addCartText}>Add to Cart</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerCart: {
    width: 150,
    height: 36,
    backgroundColor: Constants.BLUE,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCartText: {
    fontSize: 16,
    fontWeight: '400',
    color: Constants.WHITE,
  },
  containterOption: {
    flexDirection: 'row',
  },
  containerCount: {
    height: 30,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constants.BLUE,
  },
  containerOptionItem: {
    width: 30,
    height: 30,
    backgroundColor: Constants.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: Constants.BLACK,
  },
  countText: {
    fontSize: 20,
    color: Constants.WHITE,
  },
});

export default AddtoCart;
