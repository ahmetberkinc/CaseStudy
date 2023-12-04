import React, {useEffect, useState, useRef} from 'react';
import ProductListView from './ProductListView';
import {getAllProducts, getProductList} from '../../services/productApi';

const ProductListContainer = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  //Display loading icon with footer element of FlatList
  const [isLoading, setIsLoading] = useState(false);

  //Responsible for detecting is product last page of array.
  const [hasMoretoLoad, setHasMoretoLoad] = useState(true);

  const [selectedFilterOption, setSelectedFilterOption] = useState({
    sort: 'Default',
    brand: 'All',
    model: 'All',
  });
  const [searchInput, setSearchInput] = useState('');

  const page = useRef(1);

  useEffect(() => {
    getEntireProducts();
  }, []);

  //This api call responsible for displaying all available filter options
  function getEntireProducts() {
    getAllProducts().then(result => {
      setAllProducts(result);
    });
  }

  useEffect(() => {
    getProducts(false);
  }, [selectedFilterOption, searchInput]);

  //Get products with limit=12&pagination when page is render
  function getProducts(pagination) {
    setIsLoading(true);
    getProductList(page.current, searchInput, selectedFilterOption)
      .then(result => {
        if (pagination) {
          setDisplayedProducts([...displayedProducts, ...result]);
          page.current += 1;
        } else {
          page.current = 1;
          setDisplayedProducts(result);
        }

        setIsLoading(false);
        if (result.length < 12) {
          setHasMoretoLoad(false);
        }
      })
      .catch(setIsLoading(false));
  }

  return (
    <ProductListView
      displayedProducts={displayedProducts}
      allProducts={allProducts}
      onEndReached={getProducts}
      isLoading={isLoading}
      hasMoretoLoad={hasMoretoLoad}
      setSelectedFilterOption={setSelectedFilterOption}
      selectedFilterOption={selectedFilterOption}
      searchInput={searchInput}
      setSearchInput={setSearchInput}
    />
  );
};

export default ProductListContainer;
