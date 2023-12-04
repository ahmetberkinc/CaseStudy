import React from 'react';
import renderer from 'react-test-renderer';
import ProductListContainer from '../src/screens/productList/ProductListContainer';

test('renders correctly', () => {
  const tree = renderer.create(<ProductListContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
