import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProductListContainer from './src/screens/productList/ProductListContainer';
import ProductDetailContainer from './src/screens/productDetail/ProductDetailContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Constants from './constants';
import CartContainer from './src/screens/cart/CartContainer';
import MainContext, {MainContextProvider} from './src/context/MainContext';
import FavoriteListContainer from './src/screens/favoriteList/FavoriteListContainer';
import HeaderLeftAction from './navigation/components/HeaderLeftAction';
import {createStackNavigator} from '@react-navigation/stack';

const App = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  function BottomTabs() {
    const {cartProductCount} = useContext(MainContext);

    return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="ProductList"
          component={ProductListContainer}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <Ionicons name="home-outline" color={Constants.BLACK} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartContainer}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <Ionicons
                name="basket-outline"
                color={Constants.BLACK}
                size={30}
              />
            ),
            tabBarBadge: cartProductCount,
            headerLeft: () => <HeaderLeftAction />,
          }}
        />
        <Tab.Screen
          name="FavoriteList"
          component={FavoriteListContainer}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: () => (
              <Entypo name="star-outlined" color={Constants.BLACK} size={30} />
            ),
            headerLeft: () => <HeaderLeftAction />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProductListContainer}
          options={({route}) => ({
            headerStyle: {backgroundColor: Constants.BLUE},
            tabBarShowLabel: false,
            title:
              route.params?.product?.brand + ' ' + route.params?.product?.name,
            tabBarIcon: () => (
              <Ionicons
                name="person-outline"
                color={Constants.BLACK}
                size={30}
              />
            ),
            headerLeft: () => <HeaderLeftAction />,
          })}
        />
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaProvider>
      <MainContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: Constants.BLUE},
              headerTitleStyle: {
                color: Constants.WHITE,
                fontSize: 22,
              },
            }}>
            <Stack.Screen name="E-Market" component={BottomTabs} />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailContainer}
              options={({route}) => ({
                headerStyle: {backgroundColor: Constants.BLUE},
                tabBarShowLabel: false,
                title:
                  route.params?.product?.brand +
                  ' ' +
                  route.params?.product?.name,
                headerLeft: () => <HeaderLeftAction />,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MainContextProvider>
    </SafeAreaProvider>
  );
};

export default App;
