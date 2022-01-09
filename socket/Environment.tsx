const useLocalhostApis = false;

const environment: any = {
  localhost: useLocalhostApis
    ? 'http://localhost:5000'
    : 'https://mobile-server.decentral.games',
  testing: 'https://mobile-server.testing.decentral.games',
  development: 'https://mobile-server.dev.decentral.games',
  staging: 'https://mobile-server.staging.decentral.games',
  production: 'https://mobile-server.decentral.games',
};

export default environment;
