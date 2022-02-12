import axios from 'axios';
import getCachedSession from './GetCachedSession';

const call = (
  url: string,
  method: string,
  withToken = true,
  data: any = {}
): any => {
  const cachedSession = getCachedSession(data.userAddress);

  if (withToken && !cachedSession.token) {
    return new Promise((resolve, reject) => {
      reject("Couldn't get an access token");
    });
  }

  let header: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (withToken) {
    header['Authorization'] = `Bearer ${cachedSession.token}`;
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
