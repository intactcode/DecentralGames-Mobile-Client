const useLocalhostApis = true;

const environment: any = {
  localhost: useLocalhostApis
    ? 'ws://localhost:5001'
    : 'wss://mobile.socket.decentral.games',
  testing: 'wss://mobile.socket.testing.decentral.games',
  development: 'wss://192.168.0.168:5000',
  staging: 'wss://mobile.socket.staging.decentral.games',
  production: 'wss://mobile.socket.decentral.games',
};

export default environment;
