import { useEffect } from 'react';
import Fetch from '../api/Fetch';
import { useStoreDispatch } from './Hooks';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import constants from '../components/common/Constants';

declare const window: any;

const registerUser = async (dispatch: any) => {
  await Fetch.REGISTER('');

  dispatch({
    type: 'update_status',
    data: 4,
  });
};

const loginUser = async (dispatch: any, userAddress: string) => {
  try {
    const jsonStatus = await Fetch.USER_STATUS();

    if (!jsonStatus || !jsonStatus.status) {
      return false;
    } else {
      console.log('Dispatching user data');
    }

    dispatch({
      type: 'update_status',
      data: jsonStatus.status,
    });

    dispatch({
      type: 'user_address',
      data: userAddress,
    });

    return jsonStatus.status;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const disconnectWallet = (dispatch: any) => {
  dispatch({
    type: 'update_status',
    data: 0,
  });

  dispatch({
    type: 'user_address',
    data: '',
  });

  localStorage.removeItem('userAddress');
  localStorage.removeItem('token');
};

const assignToken = async (dispatch: any, web3: any, userAddress: string) => {
  // Segment: track wallet connect event
  window.analytics.track('Connected Wallet', {
    userAddress: userAddress,
  });

  console.log('Connected wallet with address:', userAddress);
  console.log('Waiting for signature...');

  const timestamp = Date.now();

  const msg = web3.utils.utf8ToHex(
    `Decentral Games Login\nTimestamp: ${timestamp}`
  );

  try {
    const signature = await web3.eth.personal.sign(msg, userAddress, '');

    // get JWT token
    const token = await Fetch.GET_TOKEN(userAddress, signature, timestamp);

    if (!token) {
      console.log('Error retrieving token');

      dispatch({
        type: 'update_status',
        data: 0,
      });
      return;
    }

    console.log('Assigned token:', token);

    localStorage.setItem('userAddress', userAddress);
    localStorage.setItem('token', token);

    const userStatus = await loginUser(dispatch, userAddress);
    if (userStatus === false) {
      await registerUser(dispatch);
    }
  } catch {
    // user cancelled signature
    dispatch({
      type: 'update_status',
      data: 0,
    });
  }
};

const getWalletConnectProvider = () => {
  return new WalletConnectProvider({
    rpc: constants.MATIC_RPC,
    chainId: constants.MATIC_CHAIN_ID,
    qrcode: false,
  });
};

const connectMobileWallet = async (dispatch: any) => {
  const provider: WalletConnectProvider = getWalletConnectProvider();
  if (provider.connector.connected) {
    provider.close(); // close any existing connection
  }
  const web3 = new Web3(provider as any);

  provider.connector.on('display_uri', (err, payload) => {
    const uri = payload.params[0];
    console.log('Display URI: ' + uri);

    const formattedURI = `https://metamask.app.link/wc?uri=${encodeURIComponent(
      uri
    )}`;
    window.location.replace(formattedURI);
  });

  provider.connector.on('connect', async (err, payload) => {
    console.log('Wallet connected:', payload);

    const { accounts } = payload.params[0];
    const address = accounts[0];

    await assignToken(dispatch, web3, address);

    provider.close();
  });

  provider.connector.on('transport_error', () => {
    console.log('transport_error');

    provider.close();
  });

  await provider.enable();
  provider.updateRpcUrl(constants.MATIC_CHAIN_ID);
};

const connectDesktopWallet = async (dispatch: any) => {
  await window.ethereum.request({ method: 'eth_requestAccounts' }); // open MetaMask for login
  await assignToken(
    dispatch,
    new Web3(window.ethereum),
    window.ethereum.selectedAddress
  );
};

export const connectWallet = async (dispatch: any) => {
  if (window.ethereum) {
    dispatch({
      type: 'update_status',
      data: 3,
    });

    connectDesktopWallet(dispatch);
  } else {
    connectMobileWallet(dispatch);
  }
};

const refreshToken = async (dispatch: any) => {
  try {
    const token = await Fetch.REFRESH_TOKEN();

    if (!token) {
      console.log('Error refreshing token');

      dispatch({
        type: 'update_status',
        data: 0,
      });
    } else {
      console.log('Retrieved refreshed token: ' + token);

      localStorage.setItem('token', token);
    }
  } catch (error) {
    console.log(error);
  }
};

function Wallet() {
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      // check if user is already logged in on app launch
      const cachedUserAddress = localStorage.getItem('userAddress');
      const userAddress = window.ethereum
        ? window.ethereum.selectedAddress
        : cachedUserAddress;
      const token = localStorage.getItem('token');

      if (userAddress && token && userAddress === cachedUserAddress) {
        dispatch({
          type: 'update_status',
          data: 3,
        });

        const userStatus = await loginUser(dispatch, userAddress);

        if (userStatus !== false) {
          // get new access token to extend expiration time by 12 hours
          refreshToken(dispatch);
        } else {
          // token expired; user needs to reauthenticate account
          console.log('Expired token');

          dispatch({
            type: 'update_status',
            data: 2,
          });
        }
      }

      // add event listeners for desktop wallet
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', (account: string) => {
          console.log('Account changed to:', account);

          if (localStorage.getItem('userAddress')) {
            disconnectWallet(dispatch);
            window.location.reload();
          }
        });

        window.ethereum.on('disconnect', () => {
          console.log('Wallet disconnected');

          if (localStorage.getItem('userAddress')) {
            disconnectWallet(dispatch);
            window.location.reload();
          }
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default Wallet;
