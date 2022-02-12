import getConfig from 'next/config';
import environment from './Environment';

// This imports APP_ENV from next.config.js. APP_ENV must be set in the .env file
const { publicRuntimeConfig } = getConfig();
const { APP_ENV } = publicRuntimeConfig;
const socketServerURL = environment[APP_ENV] || process.env.SOCKET_SERVER_URL;

console.log('Socket server: ', socketServerURL);

export default socketServerURL;
