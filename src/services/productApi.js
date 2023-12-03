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

  console.log('url', url);

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
