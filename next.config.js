// /** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
    API_URL: process.env.API_URL,
    SOCKET_SERVER_URL: process.env.SOCKET_SERVER_URL,
    USE_STATIC_MOBILE_ACCOUNTS: process.env.USE_STATIC_MOBILE_ACCOUNTS,
    ACCOUNT_1_ADDRESS: process.env.ACCOUNT_1_ADDRESS,
    ACCOUNT_1_TOKEN: process.env.ACCOUNT_1_TOKEN,
    ACCOUNT_2_ADDRESS: process.env.ACCOUNT_2_ADDRESS,
    ACCOUNT_2_TOKEN: process.env.ACCOUNT_2_TOKEN,
    ACCOUNT_3_ADDRESS: process.env.ACCOUNT_3_ADDRESS,
    ACCOUNT_3_TOKEN: process.env.ACCOUNT_3_TOKEN,
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
    'res.cloudinary.com',
    'peer-ec2.decentraland.org',
  ],
};

module.exports.redirects = async () => {
  return [
    {
      source: '/:path',
      destination: '/',
      permanent: true,
    },
  ];
};
