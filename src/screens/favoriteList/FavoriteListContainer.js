import React, {useEffect, useState, useRef, useContext} from 'react';
import {
  filterProductList,
  findDisplayedProducts,
  getFavProducts,
  searchProducts,
} from '../../services/productApi';
import MainContext from '../../context/MainContext';
import ProductListView from '../productList/ProductListView';
import {useIsFocused} from '@react-navigation/native';

const FavoriteListContainer = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  //Display loading icon with footer element of FlatList
  const [isLoading, setIsLoading] = useState(false);

  //Responsible for detecting is product last page of array.
  const [hasMoretoLoad, setHasMoretoLoad] = useState(true);

  const [selectedFilterOption, setSelectedFilterOption] = useState('ALL');
  const [searchInput, setSearchInput] = useState('');

  const page = useRef(1);

  const {updateFavListToggle} = useContext(MainContext);
  const isFocused = useIsFocused();

  //Update data after removing item from favlist
  useEffect(() => {
    isFocused && getAllFavProducts();
  }, [updateFavListToggle, isFocused]);

  //Get all products when page is render
  function getAllFavProducts() {
    getFavProducts().then(result => {
      setDisplayedProducts(result), setAllProducts(result);
    });
  }

  //Display products with user input
  function onSearchTextInput(searchValue) {
    page.current = 1;
    if (searchValue.length === 0) {
      getProducts();
    } else {
      searchProducts(page.current, searchValue).then(result => {
        setDisplayedProducts(
          findDisplayedProducts(result, selectedFilterOption, searchValue),
        );
        if (result.length < 12) {
          setHasMoretoLoad(false);
        }
      });
    }
  }

  //Filter products with user brand filter option
  function filterProducts(keyToFilterBy) {
    page.current = 1;
    filterProductList(page.current, keyToFilterBy).then(result => {
      setDisplayedProducts(
        findDisplayedProducts(result, keyToFilterBy, searchInput),
      );
      if (result.length < 12) {
        setHasMoretoLoad(false);
      }
    });
  }

  return (
    <ProductListView
      displayedProducts={displayedProducts}
      allProducts={allProducts}
      onEndReached={null}
      isLoading={isLoading}
      hasMoretoLoad={hasMoretoLoad}
      setSelectedFilterOption={setSelectedFilterOption}
      selectedFilterOption={selectedFilterOption}
      onSearchTextInput={searchValue => onSearchTextInput(searchValue)}
      onFilterSelection={filterKey => filterProducts(filterKey)}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
    />
  );
};

export default FavoriteListContainer;
