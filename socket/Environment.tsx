const useLocalhostApis = true;

const environment: any = {
  localhost: useLocalhostApis
    ? 'ws://localhost:2567'
    : 'wss://mobile.socket.decentral.games',
  testing: 'wss://mobile.socket.testing.decentral.games',
  development: 'wss://mobile.socket.dev.decentral.games',
  staging: 'wss://mobile.socket.staging.decentral.games',
  production: 'wss://mobile.socket.decentral.games',
};

export default environment;
