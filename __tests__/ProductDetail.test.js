import React from 'react';
import renderer from 'react-test-renderer';
import ProductDetailContainer from '../src/screens/productDetail/ProductDetailContainer';

test('renders correctly', () => {
  const tree = renderer.create(<ProductDetailContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
