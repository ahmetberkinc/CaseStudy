import React, {useEffect, useState, useRef} from 'react';
import ProductListView from './ProductListView';
import {getProductList} from '../../services/productApi';

const ProductListContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoretoLoad, setHasMoretoLoad] = useState(true);

  const page = useRef(1);

  useEffect(() => {
    getProducts();
  }, []);

  //Get products with limit=12&pagination when page is render
  function getProducts() {
    setIsLoading(true);
    getProductList(page.current)
      .then(result => {
        setProducts([...products, ...result]);
        page.current += 1;
        setIsLoading(false);
        if (result.length < 12) {
          setHasMoretoLoad(false);
        }
      })
      .catch(setIsLoading(false));
  }

  return (
    <ProductListView
      products={products}
      onEndReached={getProducts}
      isLoading={isLoading}
      hasMoretoLoad={hasMoretoLoad}
    />
  );
};

export default ProductListContainer;
