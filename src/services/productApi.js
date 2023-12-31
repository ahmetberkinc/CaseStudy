import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../constants';

export const getProductList = async (
  pageNumber,
  searchInput,
  filterOptions,
) => {
  let url;

  if (searchInput !== '') {
    url = Constants.BASE_URL + `name=${searchInput}`;
  } else {
    url = Constants.BASE_URL;
  }

  if (filterOptions.brand !== 'All') {
    url += `&brand=${filterOptions.brand}`;
  }

  if (filterOptions.model !== 'All') {
    url += `&model=${filterOptions.model}`;
  }

  if (filterOptions.sort !== 'Default') {
    url += `&sortby=${filterOptions.sort.type}&order=${filterOptions.sort.order}`;
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

export async function addFavProduct(product) {
  try {
    const jsonValue = await AsyncStorage.getItem('favProducts');
    //Already exist fav products
    if (jsonValue !== null) {
      await AsyncStorage.setItem(
        'favProducts',
        JSON.stringify(JSON.parse(jsonValue).concat(product)),
      );
      //First time add favorite
    } else {
      await AsyncStorage.setItem('favProducts', JSON.stringify([product]));
    }
  } catch (e) {
    // saving error
  }
}

export async function removeFavProduct(product) {
  let favProducts = [];
  let updatedFavProducts = [];
  try {
    const jsonValue = await AsyncStorage.getItem('favProducts');
    favProducts = JSON.parse(jsonValue);

    updatedFavProducts = favProducts.filter(
      favProduct => favProduct.id !== product.id,
    );

    await AsyncStorage.setItem(
      'favProducts',
      JSON.stringify(updatedFavProducts),
    );
  } catch (e) {
    // error reading value
  }
}

export async function getFavProducts() {
  try {
    const jsonValue = await AsyncStorage.getItem('favProducts');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}

export async function checkProductIsFav(product) {
  try {
    const jsonValue = await AsyncStorage.getItem('favProducts');
    if (jsonValue !== null) {
      // value previously stored
      return JSON.parse(jsonValue).some(
        favProduct => favProduct.id === product.id,
      );
    }
    return false;
  } catch (e) {
    // error reading value
  }
}
