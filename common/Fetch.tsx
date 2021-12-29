import call from './API';
import getConfig from 'next/config';
import { ApiUrlsByAppEnv } from './environments';

// This imports NODE_ENV from next.config.js
const { publicRuntimeConfig } = getConfig();
const { APP_ENV } = publicRuntimeConfig;

// APP_ENV must be set in the .env.{environment} files
export const API_BASE_URL =
  ApiUrlsByAppEnv[APP_ENV] || 'https://api.decentral.games';

console.log('APP_ENV: ', APP_ENV);
console.log('API_BASE_URL: ', API_BASE_URL);

const Fetch = {
  USER_STATUS: () => {
    return call(`${API_BASE_URL}/order/webLogin`, 'POST', true);
  },
  REGISTER: (affiliate: any) => {
    return call(`${API_BASE_URL}/order/webRegister`, 'POST', true, {
      affiliate,
    });
  },
};

export default Fetch;
