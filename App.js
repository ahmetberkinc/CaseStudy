/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductListContainer from './src/screens/productList/ProductListContainer';
import ProductDetailContainer from './src/screens/productDetail/ProductDetailContainer';

const App = () => {
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="ProductList" component={ProductListContainer} />
        <Tab.Screen name="FavoriteList" component={ProductListContainer} />
        <Tab.Screen name="ProductDetail" component={ProductDetailContainer} />
        <Tab.Screen name="Cart" component={ProductListContainer} />
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
