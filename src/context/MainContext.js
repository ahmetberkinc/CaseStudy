import React, {createContext, useState, useEffect} from 'react';
import {getUniqueCartProductCount} from '../services/productApi';

const MainContext = createContext();

export const MainContextProvider = ({children}) => {
  const [updateCartToggle, setUpdateCartToggle] = useState(false);
  const [cartProductCount, setCartProductCount] = useState(0);

  useEffect(() => {
    getUniqueCartProductCount().then(count => setCartProductCount(count));
  }, []);

  const values = {
    updateCartToggle,
    setUpdateCartToggle,
    cartProductCount,
    setCartProductCount,
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export default MainContext;
