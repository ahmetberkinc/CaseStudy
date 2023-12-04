import React from 'react';
import renderer from 'react-test-renderer';
import CartContainer from '../src/screens/cart/CartContainer';

test('renders correctly', () => {
  const tree = renderer.create(<CartContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
