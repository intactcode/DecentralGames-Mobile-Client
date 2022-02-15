import call from './Call';
import getConfig from 'next/config';
import environment from './Environment';
import constants from '../components/common/Constants';

// This imports APP_ENV from next.config.js. APP_ENV must be set in the .env file
const { publicRuntimeConfig } = getConfig();
const { APP_ENV } = publicRuntimeConfig;
export const API_BASE_URL = environment[APP_ENV] || process.env.API_URL;

console.log('App environment: ', APP_ENV);
console.log('API base URL: ', API_BASE_URL);

const Fetch = {
  GET_TOKEN: (address: string, signature: string, timestamp: number) => {
    return call(
      // eslint-disable-next-line max-len
      `${API_BASE_URL}/authentication/getWebAuthToken?address=${address}&signature=${signature}&timestamp=${timestamp}&ttl=${constants.AUTH_TOKEN_TTL}`,
      'GET',
      false
    );
  },

  REFRESH_TOKEN: (userAddress: string) => {
    return call(`${API_BASE_URL}/authentication/extendToken`, 'POST', true, {
      userAddress,
      ttl: constants.AUTH_TOKEN_TTL,
    });
  },

  USER_STATUS: () => {
    return call(`${API_BASE_URL}/order/webLogin`, 'POST', true);
  },

  REGISTER: (affiliate: string) => {
    return call(`${API_BASE_URL}/order/webRegister`, 'POST', true, {
      affiliate,
    });
  },
};

export default Fetch;
