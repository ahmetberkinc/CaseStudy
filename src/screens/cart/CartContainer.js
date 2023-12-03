import React, {useState, useEffect, useContext} from 'react';
import CartView from './CartView';
import {getCartProducts} from '../../services/productApi';
import {useIsFocused} from '@react-navigation/native';
import MainContext from '../../context/MainContext';

const CartContainer = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const {updateCartToggle} = useContext(MainContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getCartProducts().then(products => setCartProducts(products));
  }, [isFocused, updateCartToggle]);

  return <CartView cartProducts={cartProducts} />;
};

export default CartContainer;
