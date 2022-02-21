// /** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');

module.exports = withPWA({
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
    API_URL: process.env.API_URL,
    SOCKET_SERVER_URL: process.env.SOCKET_SERVER_URL,
    USE_STATIC_MOBILE_ACCOUNTS: process.env.USE_STATIC_MOBILE_ACCOUNTS,
    MOBILE_WIDTHS: {
      390: {
        address: process.env.ACCOUNT_1_ADDRESS,
        token: process.env.ACCOUNT_1_TOKEN,
        deviceName: 'iPhone 13 Pro',
      },
      428: {
        address: process.env.ACCOUNT_2_ADDRESS,
        token: process.env.ACCOUNT_2_TOKEN,
        deviceName: 'iPhone 13 Pro Max',
      },
      375: {
        address: process.env.ACCOUNT_3_ADDRESS,
        token: process.env.ACCOUNT_3_TOKEN,
        deviceName: 'iPhone 13 Mini',
      },
    },
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

module.exports.blisk = async () => {
  /* Set this environment variable to "true" if you'd like to test on simulated mobile devices
           that don't support crypto wallets (Blisk, BrowserStack, etc.)

           For this to work, each account needs its Ethereum address and authentication token
           defined in the .env file.
        */
};
