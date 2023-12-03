import React, {useEffect, useState, useRef} from 'react';
import ProductListView from './ProductListView';
import {
  filterProductList,
  findDisplayedProducts,
  getAllProducts,
  getProductList,
  searchProducts,
} from '../../services/productApi';

const ProductListContainer = () => {
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  //Display loading icon with footer element of FlatList
  const [isLoading, setIsLoading] = useState(false);

  //Responsible for detecting is product last page of array.
  const [hasMoretoLoad, setHasMoretoLoad] = useState(true);

  const [selectedFilterOption, setSelectedFilterOption] = useState('ALL');
  const [searchInput, setSearchInput] = useState('');

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
    getProductList(page.current, selectedFilterOption, searchInput)
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
      onEndReached={getProducts}
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

export default ProductListContainer;
