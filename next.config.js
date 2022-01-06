// /** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    APP_ENV: process.env.APP_ENV,
  },
  pwa: {
    dest: 'public',
    disable: process.env.APP_ENV === 'development',
  },
  reactStrictMode: true,
});
