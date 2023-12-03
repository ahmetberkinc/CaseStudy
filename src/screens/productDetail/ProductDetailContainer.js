import React from 'react';
import ProductDetailView from './ProductDetailView';
import {useNavigation} from '@react-navigation/native';

const ProductDetailContainer = ({route}) => {
  const {product} = route.params;

  const navigation = useNavigation();

  return <ProductDetailView product={product} />;
};

export default ProductDetailContainer;
