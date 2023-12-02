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
