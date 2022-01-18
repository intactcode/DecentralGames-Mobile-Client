const useLocalhostApis = false;

const environment: any = {
  localhost: useLocalhostApis
    ? 'http://localhost:5000'
    : 'https://mobile.socket.decentral.games',
  testing: 'https://mobile.socket.testing.decentral.games',
  development: 'https://mobile.socket.dev.decentral.games',
  staging: 'https://mobile.socket.staging.decentral.games',
  production: 'https://mobile.socket.decentral.games',
};

export default environment;
