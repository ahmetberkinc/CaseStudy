import React, {useEffect, useState, useRef} from 'react';
import ProductListView from './ProductListView';
import {
  filterProductList,
  getAllProducts,
  getProductList,
} from '../../services/productApi';

const ProductListContainer = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  //Display loading icon with footer element of FlatList
  const [isLoading, setIsLoading] = useState(false);

  //Responsible for detecting is product last page of array.
  const [hasMoretoLoad, setHasMoretoLoad] = useState(true);

  const [selectedFilterOption, setSelectedFilterOption] = useState('ALL');

  const page = useRef(1);

  useEffect(() => {
    getProducts();
    getEntireProducts();
  }, []);

  //This api call responsible for displaying all available filter options
  function getEntireProducts() {
    getAllProducts().then(result => {
      setAllProducts(result);
    });
  }

  //Get products with limit=12&pagination when page is render
  function getProducts() {
    setIsLoading(true);
    getProductList(page.current, selectedFilterOption)
      .then(result => {
        setDisplayedProducts([...displayedProducts, ...result]);
        page.current += 1;
        setIsLoading(false);
        if (result.length < 12) {
          setHasMoretoLoad(false);
        }
      })
      .catch(setIsLoading(false));
  }

  //Filter products with user brand filter option
  function filterProducts(keyToFilterBy) {
    setIsLoading(true);
    page.current = 1;
    filterProductList(page.current, keyToFilterBy)
      .then(result => {
        setDisplayedProducts(result);
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
      onFilterSelection={filterKey => filterProducts(filterKey)}
    />
  );
};

export default ProductListContainer;
