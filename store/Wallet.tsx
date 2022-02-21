import { useEffect } from 'react';
import Fetch from '../api/Fetch';
import { useStoreDispatch, useWindowSize } from '../hooks/Hooks';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { convertUtf8ToHex } from '@walletconnect/utils';
import Web3 from 'web3';
import constants from '../components/common/Constants';
import getCachedSession from '../api/GetCachedSession';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

declare const window: any;

/* userStatus Reference:
 * 0: Wallet is neither connected nor authenticated
 * 2: Wallet is connected, but auth token is needed
 * 3: Wallet is in the process of verifying token; waiting on API response
 * 4+: Wallet is connected and authenticated
 */

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

export const disconnectWallet = (dispatch: any, clearAllSessions: boolean) => {
  dispatch({
    type: 'update_status',
    data: 0,
  });

  dispatch({
    type: 'user_address',
    data: '',
  });

  if (clearAllSessions) {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('session-0x')) {
        localStorage.removeItem(key);
      }
    });
  }
};

const storeSession = (userAddress: string, token: string) => {
  localStorage.setItem(
    `session-${userAddress}`,
    JSON.stringify({
      userAddress: userAddress,
      token: token,
      expiration: new Date(
        new Date().getTime() + 60 * 60 * constants.AUTH_TOKEN_TTL * 1000
      ),
    })
  );
};

export const assignToken = async (dispatch: any, web3: Web3) => {
  const userAddress =
    window.ethereum?.selectedAddress ||
    (await web3.eth.getAccounts())[0]?.toLowerCase();

  // Segment: track wallet connect event
  window.analytics.track('Connected Wallet', {
    userAddress: userAddress,
  });

  console.log('Connected wallet with address:', userAddress);
  console.log('Waiting for signature...');

  try {
    const timestamp = Date.now();
    const message = `Decentral Games Login\nTimestamp: ${timestamp}`;
    const hexMsg = convertUtf8ToHex(message);
    const signature = await web3.eth.personal.sign(hexMsg, userAddress, '');

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

    dispatch({
      type: 'update_status',
      data: 3,
    });

    console.log('Assigned token:', token);
    storeSession(userAddress, token);

    const userStatus = await loginUser(dispatch, userAddress);
    if (userStatus === false) {
      await registerUser(dispatch);
    }
  } catch (e) {
    // User cancelled signature
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
    qrcodeModalOptions: {
      mobileLinks: ['rainbow', 'metamask', 'ledger', 'argent', 'trust'],
    },
  });
};

const connectMobileWallet = async (dispatch: any) => {
  window.localStorage.removeItem('walletconnect');
  const provider: WalletConnectProvider = getWalletConnectProvider();
  provider.updateRpcUrl(constants.MATIC_CHAIN_ID);
  const web3 = new Web3(provider as any);
  dispatch({
    type: 'web3_provider',
    data: web3,
  });

  provider.on('accountsChanged', async (accounts: string[]) => {
    const address = accounts[0];
    console.log('Wallet connected:', address);

    dispatch({
      type: 'update_status',
      data: 2,
    });
  });

  try {
    await provider.enable();
  } catch {
    console.log('Error connecting to wallet');
  }
};

const connectDesktopWallet = async (dispatch: any) => {
  await window.ethereum.request({ method: 'eth_requestAccounts' }); // open MetaMask for login
  await assignToken(dispatch, new Web3(window.ethereum));
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

const refreshToken = async (dispatch: any, userAddress: string) => {
  try {
    const token = await Fetch.REFRESH_TOKEN(userAddress);

    if (!token) {
      console.log('Error refreshing token');

      dispatch({
        type: 'update_status',
        data: 0,
      });
    } else {
      console.log('Retrieved refreshed token: ' + token);
      storeSession(userAddress, token);
    }
  } catch (error) {
    console.log(error);
  }
};

function Wallet() {
  const dispatch = useStoreDispatch(); // returns dispatch method from Context API store
  const size = useWindowSize();

  /////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    (async () => {
      if (size.width === 0) {
        return;
      }
      let userAddress;

      const { USE_STATIC_MOBILE_ACCOUNTS, MOBILE_WIDTHS } = publicRuntimeConfig;

      if (USE_STATIC_MOBILE_ACCOUNTS === 'true') {
        /* Set this environment variable to "true" if you'd like to test on simulated mobile devices
           that don't support crypto wallets (Blisk, BrowserStack, etc.)

           For this to work, each account needs its Ethereum address and authentication token
           defined in the .env.local file.
        */
        const credentials = MOBILE_WIDTHS[size.width];

        if (credentials) {
          console.log(
            `Detected device: ${credentials.deviceName}; Using account: ${credentials.address}`
          );
          userAddress = credentials.address;
          storeSession(credentials.address, credentials.token);
        } else {
          console.log(
            'No supported device detected for using static mobile accounts'
          );
        }
      }

      // check if user is already logged in on app launch
      userAddress = window.ethereum
        ? window.ethereum.selectedAddress
        : undefined;
      const cachedSession = getCachedSession(userAddress);

      if (cachedSession.userAddress) {
        dispatch({
          type: 'update_status',
          data: 3,
        });

        userAddress = cachedSession.userAddress;
        const userStatus = await loginUser(dispatch, userAddress);

        if (userStatus !== false) {
          // get new access token to extend expiration time by 12 hours
          console.log(`Refreshing token for ${userAddress}`);
          refreshToken(dispatch, userAddress);
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
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          console.log('Account changed to:', accounts[0]);

          disconnectWallet(dispatch, accounts.length === 0);
          window.location.reload();
        });

        window.ethereum.on('disconnect', () => {
          console.log('Wallet disconnected');

          disconnectWallet(dispatch, true);
          window.location.reload();
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return null;
}

export default Wallet;
