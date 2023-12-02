export const getProductList = async pageNumber => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://5fc9346b2af77700165ae514.mockapi.io/products?page=${pageNumber}&limit=${12}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => {
        resolve(response.json());
      })
      .catch(error => {
        reject(error);
        console.log('error', error);
      });
  });
};
