import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../constants';

export const getProductList = async (pageNumber, brandName) => {
  let url;

  if (brandName !== 'ALL') {
    url = Constants.BASE_URL + `brand=${brandName}`;
  } else {
    url = Constants.BASE_URL;
  }

  return new Promise((resolve, reject) => {
    fetch(`${url}&page=${pageNumber}&limit=${12}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        resolve(response.json());
      })
      .catch(error => {
        reject(error);
        console.log('error', error);
      });
  });
};

export const getAllProducts = async => {
  return new Promise((resolve, reject) => {
    fetch(`${Constants.BASE_URL}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        resolve(response.json());
      })
      .catch(error => {
        reject(error);
        console.log('error', error);
      });
  });
};

export const searchProducts = async (pageNumber, searchValue) => {
  let url;

  url = Constants.BASE_URL + `search=${searchValue}`;

  return new Promise((resolve, reject) => {
    fetch(`${url}&page=${pageNumber}&limit=${12}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        resolve(response.json());
      })
      .catch(error => {
        reject(error);
        console.log('error', error);
      });
  });
};

export const filterProductList = async (pageNumber, brandName) => {
  let url;

  if (brandName !== 'ALL') {
    url = Constants.BASE_URL + `brand=${brandName}`;
  } else {
    url = Constants.BASE_URL;
  }

  return new Promise((resolve, reject) => {
    fetch(`${url}&page=${pageNumber}&limit=${12}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        resolve(response.json());
      })
      .catch(error => {
        reject(error);
        console.log('error', error);
      });
  });
};

export const findDisplayedProducts = (array, brandName, searchValue) => {
  searchValue = searchValue.toLowerCase();

  if (brandName === 'ALL' && searchValue === '') {
    return array;
  } else if (brandName === 'ALL' && searchValue !== '') {
    return array.filter(product => {
      return (
        product?.brand.toLowerCase().includes(searchValue) ||
        product?.description.toLowerCase().includes(searchValue) ||
        product?.model.toLowerCase().includes(searchValue) ||
        product?.name.toLowerCase().includes(searchValue)
      );
    });
  } else if (brandName !== 'ALL' && searchValue === '') {
    return array.filter(product => {
      return product?.brand.toLowerCase().includes(searchValue);
    });
  } else if (brandName !== 'ALL' && searchValue !== '') {
    return array
      .filter(product => {
        return (
          product?.brand.toLowerCase().includes(searchValue) ||
          product?.description.toLowerCase().includes(searchValue) ||
          product?.model.toLowerCase().includes(searchValue) ||
          product?.name.toLowerCase().includes(searchValue)
        );
      })
      .filter(product => {
        return product?.brand.toLowerCase().includes(searchValue);
      });
  }
};

export async function checkCartProductCount(product) {
  try {
    const jsonValue = await AsyncStorage.getItem('cartProducts');

    if (jsonValue !== null) {
      // value previously stored
      return JSON.parse(jsonValue).find(
        cartProduct => cartProduct.id === product.id,
      )?.count;
    }
    return false;
  } catch (e) {
    // error reading value
    console.log('e', e);
  }
}

export async function updateCartProductCount(product, count) {
  try {
    const jsonValue = await AsyncStorage.getItem('cartProducts');
    //Already exist cart products
    if (jsonValue !== null) {
      let index = JSON.parse(jsonValue).findIndex(
        cartProduct => cartProduct.id === product.id,
      );

      if (index === -1) {
        product.count = 1;
        await AsyncStorage.setItem(
          'cartProducts',
          JSON.stringify(JSON.parse(jsonValue).concat(product)),
        );
      }

      let data = JSON.parse(jsonValue);

      data[index].count = count;

      await AsyncStorage.setItem('cartProducts', JSON.stringify(data));
      //First time add favorite
    } else {
      await AsyncStorage.setItem('cartProducts', JSON.stringify([product]));
    }
  } catch (e) {
    // saving error
  }
}

export async function removeCartProduct(product) {
  let cartProducts = [];
  let updatedCartProducts = [];
  try {
    const jsonValue = await AsyncStorage.getItem('cartProducts');
    cartProducts = JSON.parse(jsonValue);

    updatedCartProducts = cartProducts.filter(
      cartProduct => cartProduct.id !== product.id,
    );

    await AsyncStorage.setItem(
      'cartProducts',
      JSON.stringify(updatedCartProducts),
    );
  } catch (e) {
    // error reading value
  }
}

export async function getUniqueCartProductCount() {
  try {
    const jsonValue = await AsyncStorage.getItem('cartProducts');

    if (jsonValue !== null) {
      return JSON.parse(jsonValue).length;
    }
    return 0;
  } catch (e) {
    // error reading value
    console.log('e', e);
  }
}

export async function getCartProducts() {
  try {
    const jsonValue = await AsyncStorage.getItem('cartProducts');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}
