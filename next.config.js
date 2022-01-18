// /** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    MOBILE_SERVER_URL: process.env.MOBILE_SERVER_URL,
    APP_ENV: process.env.APP_ENV,
  },
  pwa: {
    dest: 'public',
    disable: process.env.APP_ENV !== 'production',
  },
  reactStrictMode: true,
  swcMinify: false,
});
