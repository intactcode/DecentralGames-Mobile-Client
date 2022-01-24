import axios from 'axios';

const call = (
  url: string,
  method: string,
  withToken = true,
  data = {}
): any => {
  const accessToken = localStorage.getItem('token');

  if (withToken && !accessToken) {
    return new Promise((resolve, reject) => {
      reject("Couldn't get an access token");
    });
  }

  let header: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (withToken) {
    header['Authorization'] = `Bearer ${accessToken}`;
  }

  const options: any = {
    url,
    method,
    headers: header,
    crossDomain: true,
    data,
  };

  return axios
    .request(options)
    .then((res) => res.data)
    .catch((error) => {
      console.log('Error:', error);
    });
};

export default call;
