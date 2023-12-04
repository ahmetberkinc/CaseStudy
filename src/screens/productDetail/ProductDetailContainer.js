import React from 'react';
import ProductDetailView from './ProductDetailView';

const ProductDetailContainer = ({route}) => {
  const {product} = route.params;

  return <ProductDetailView product={product} />;
};

export default ProductDetailContainer;
