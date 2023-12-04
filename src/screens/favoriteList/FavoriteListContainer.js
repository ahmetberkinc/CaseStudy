import React, {useEffect, useState, useContext} from 'react';
import {getFavProducts} from '../../services/productApi';
import MainContext from '../../context/MainContext';
import ProductListView from '../productList/ProductListView';
import {useIsFocused} from '@react-navigation/native';

const FavoriteListContainer = () => {
  const [allProducts, setAllProducts] = useState([]);

  const {updateFavListToggle} = useContext(MainContext);
  const isFocused = useIsFocused();

  //Update data after removing item from favlist
  useEffect(() => {
    isFocused && getAllFavProducts();
  }, [updateFavListToggle, isFocused]);

  //Get all products when page is render
  function getAllFavProducts() {
    getFavProducts().then(result => setAllProducts(result));
  }

  return (
    <ProductListView displayedProducts={allProducts} isFavoriteList={true} />
  );
};

export default FavoriteListContainer;
