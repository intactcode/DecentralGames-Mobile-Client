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

module.exports.images = {
  domains: [
    'peer.decentraland.org',
    'peer-ec1.decentraland.org',
    'peer-wc1.decentraland.org',
    'peer-eu1.decentraland.org',
    'peer-ap1.decentraland.org',
    'interconnected.online',
    'peer.decentral.io',
    'peer.melonwave.com',
    'peer.kyllian.me',
    'peer.uadevops.com',
    'peer.dclnodes.io',
  ],
};
