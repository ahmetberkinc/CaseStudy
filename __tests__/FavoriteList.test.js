import React from 'react';
import renderer from 'react-test-renderer';
import FavoriteListContainer from '../src/screens/favoriteList/FavoriteListContainer';

test('renders correctly', () => {
  const tree = renderer.create(<FavoriteListContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
