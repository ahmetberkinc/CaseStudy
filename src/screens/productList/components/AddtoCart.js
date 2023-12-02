import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Constants from '../../../../constants';

const AddtoCart = () => {
  return (
    <TouchableOpacity style={styles.containerCart}>
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
});

export default AddtoCart;
